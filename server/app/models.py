from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime

from .utils import hash_avatar_url

db = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    active = Column(Boolean, default=True)
    date_created = Column(DateTime, default=datetime.now())
    date_updated = Column(DateTime, default=datetime.now(), onupdate=datetime.now())

    def save(self):
        db.session.add(self)
        db.session.commit()


class User(Base, UserMixin):
    username = Column(String(80), unique=True)
    email = Column(String(100), unique=True)
    password = Column(String(255))
    first_name = Column(String(80), nullable=True)
    last_name = Column(String(80), nullable=True)
    bio = Column(String(255), nullable=True)
    avatar = Column(String(255), default=None)

    posts = relationship("Post", backref="user", lazy=True)
    comments = relationship("Comment", backref="user", lazy=True)

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.password = generate_password_hash(kwargs.get("password"), 10)

        if not self.avatar:
            self.avatar = hash_avatar_url(email=self.email)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __str__(self):
        return self.username


post_tag = db.Table(
    "post_tag",
    Column("post_id", Integer, ForeignKey("post.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True),
)


class Tag(Base):
    label = Column(String(50), unique=True)

    def __str__(self):
        return self.label


class Category(Base):
    label = Column(String(80), unique=True)

    posts = relationship("Post", backref="category", lazy=True)

    def __str__(self):
        return self.label


class Post(Base):
    title = Column(String(80), unique=True)
    subject = Column(String(125))
    content = Column(Text)

    category_id = Column(Integer, ForeignKey(Category.id))
    user_id = Column(Integer, ForeignKey(User.id))

    comments = relationship("Comment", backref="post", lazy=True)
    tags = relationship("Tag", secondary=post_tag, backref="post", lazy=True)

    def __str__(self):
        return self.title


class Comment(Base):
    content = Column(Text)

    post_id = Column(Integer, ForeignKey(Post.id))
    user_id = Column(Integer, ForeignKey(User.id))

    def __str__(self):
        return f"Comment: {self.content[:20]}..."

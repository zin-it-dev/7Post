from .models import User, Post, Comment, db


class BaseRepository:
    def __init__(self, model):
        self.model = model

    def get_all(self):
        return self.model.query.filter(self.model.active.__eq__(True)).all()

    def get_by_id(self, id):
        try:
            return self.model.query.get(int(id))
        except ValueError:
            return None

    def create(self, **kwargs):
        instance = self.model(**kwargs)
        instance.save()
        return instance

    def update(self, id, **kwargs):
        instance = self.model.query.get(int(id))

        if not instance:
            return None

        for key, value in kwargs.items():
            setattr(instance, key, value)

        instance.save()
        return user


class PostRepository(BaseRepository):
    def __init__(self):
        super().__init__(Post)

    def get_all(self, keyword=None, category=None):
        query = self.model.query.filter(self.model.active.__eq__(True))

        if keyword:
            query = query.filter(self.model.title.contains(keyword))

        if category:
            query = query.filter(self.model.category_id.__eq__(category))

        return query.order_by(self.model.title).all()

    def filter_comments(self, id):
        return (
            db.session.query(Comment)
            .join(self.model, self.model.id.__eq__(Comment.post_id))
            .filter(self.model.active.is_(True), self.model.id.__eq__(id))
            .order_by(Comment.date_created.desc())
            .all()
        )


class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(User)

    def get_callback_users(self, identity):
        return self.model.query.filter_by(id=identity).one_or_none()

    def is_exists(self, email, username):
        return (
            self.model.query.filter(
                (self.model.email.__eq__(email)) | (self.model.username.__eq__(username))
            ).first()
            is not None
        )

    def auth_user(self, email, password):
        user = self.model.query.filter(self.model.email.__eq__(email)).first()
        return user if user and user.verify_password(password) else None


class AnalyticsRepository:
    def stats_posts_by_category():
        return db.session.query(Category.id, Category.label, func.count(Post.id)).join(Post, Post.category_id.__eq__(Category.id), isouter=True).group_by(Category.id).all()

    def stats_total_users():
        return User.query.count()
    
    def stats_active_users():
        return User.query.filter(User.active.__eq__(True)).count()
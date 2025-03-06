"""Seed database

Revision ID: 577448ddcd77
Revises: ac9ce1a5d8d0
Create Date: 2025-02-27 11:33:14.003628

"""
from alembic import op
from werkzeug.security import generate_password_hash

from app.utils import hash_avatar_url

# revision identifiers, used by Alembic.
revision = '577448ddcd77'
down_revision = 'ac9ce1a5d8d0'
branch_labels = None
depends_on = None

categories = [
    "Python Technologies",
    "Mobile Development",
    "Computer Science",
    "DevOps",
    "Machine Learning",
    "Web Development",
    "Databases",
    "Computer Programming",
]


def upgrade():
    email = "admin@gmail.com"
    hashed_password = generate_password_hash("123")
    avatar = hash_avatar_url(email=email)

    with op.batch_alter_table("user") as user_op:
        user_op.execute(
            f'INSERT INTO user (username, email, password, avatar, is_admin, active) VALUES ("admin", "{email}", "{hashed_password}", "{avatar}", TRUE,  TRUE)'
        )

    with op.batch_alter_table("category") as category_op:
        for category in categories:
            category_op.execute(f"INSERT INTO category (label, active) VALUES ('{category}', TRUE)")

    print("Migrate successfull.")

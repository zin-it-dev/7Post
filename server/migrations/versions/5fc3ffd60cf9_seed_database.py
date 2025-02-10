"""Seed database

Revision ID: 5fc3ffd60cf9
Revises: 414a86c1323f
Create Date: 2025-02-10 20:12:40.560030

"""

from alembic import op
from werkzeug.security import generate_password_hash

from app.utils import hash_avatar_url

# revision identifiers, used by Alembic.
revision = "5fc3ffd60cf9"
down_revision = "414a86c1323f"
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

from flask_restx import fields
from datetime import datetime

from .extensions import api

base = api.model(
    "Base",
    {
        "id": fields.String(description="Unique identifier"),
        "active": fields.Boolean(description="Status of the resource", default=True),
        "date_created": fields.DateTime(
            description="The date and time when the resource was created", default=datetime.utcnow
        ),
        "date_updated": fields.DateTime(
            description="The date and time when the resource was last updated",
            default=datetime.utcnow,
        ),
    },
)

post = api.inherit(
    "Post",
    base,
    {
        "title": fields.String(required=True, description="The post title"),
        "content": fields.String(required=True, description="The post content"),
    },
)

login = api.model(
    "Log In",
    {"email": fields.String(required=True), "password": fields.String(required=True)},
)

user = api.inherit(
    "Current User",
    base,
    {
        "username": fields.String(required=True, description="The user username"),
        "email": fields.String(required=True, description="The user email"),
        "first_name": fields.String(description="The first name of the user"),
        "last_name": fields.String(description="The last name of the user"),
        "avatar": fields.String(description="URL to the user's profile avatar"),
    },
)

profile = api.inherit(
    "Current User",
    user,
    {
        "bio": fields.String(description="The user bio"),
    },
)

new_user = api.inherit(
    "User",
    user,
    {
        "password": fields.String(required=True, description="The user password (hashed)"),
    },
)
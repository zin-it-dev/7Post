from flask_restx import fields
from datetime import datetime

from .extensions import api


base_fields = api.model(
    "Base",
    {
        "id": fields.String(description="Unique identifier"),
        "active": fields.Boolean(description="Status of the resource", default=True),
        "date_created": fields.DateTime(
            description="The date and time when the resource was created",
            default=datetime.utcnow,
        ),
        "date_updated": fields.DateTime(
            description="The date and time when the resource was last updated",
            default=datetime.utcnow,
        ),
    },
)

category_fields = api.clone(
    "Category",
    base_fields,
    {
        "label": fields.String(required=True, description="The category label"),
    },
)

# user = api.inherit(
#     "Current User",
#     base,
#     {
#         "username": fields.String(required=True, description="The user username"),
#         "email": fields.String(required=True, description="The user email"),
#         "avatar": fields.String(description="URL to the user's profile avatar"),
#     },
# )

# user_info = api.model(
#     "Info",
#     {
#         "username": fields.String(required=True, description="The user username"),
#         "avatar": fields.String(description="URL to the user's profile avatar"),
#     },
# )

# comment = api.inherit(
#     "Comment",
#     base,
#     {
#         "content": fields.String(required=True, description="The category label"),
#         "user": fields.Nested(
#             user_info,
#             description="The user details",
#         ),
#     },
# )

post_fields = api.clone(
    "Post",
    base_fields,
    {
        "title": fields.String(required=True, description="The post title"),
        "image": fields.String(description="The post image"),
        "subject": fields.String(required=True, description="The post subject"),
        "content": fields.String(required=True, description="The post content"),
        "tags": fields.List(fields.String, description="List tags of post"),
    },
)

# login = api.model(
#     "Log In",
#     {"email": fields.String(required=True), "password": fields.String(required=True)},
# )

# profile = api.inherit(
#     "Current User",
#     user,
#     {
#         "bio": fields.String(description="The user bio"),
#     },
# )

# new_user = api.inherit(
#     "User",
#     user,
#     {
#         "password": fields.String(required=True, description="The user password (hashed)"),
#     },
# )

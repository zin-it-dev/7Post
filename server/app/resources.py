from flask_restx import Namespace, Resource, abort
from flask import jsonify
from flask_jwt_extended import jwt_required, current_user, create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash

# from .api_models import post, user, login, new_user, profile, comment
from .api_models import post_fields
from .dao import PostRepository, UserRepository
from .parsers import post_parser, user_parser, profile_parser, password_parser, update_parser
from .utils import upload_image
from .mixins import BaseMixin

category_ns = Namespace("categories", description="Categories operations")
post_ns = Namespace("posts", description="Posts operations")
user_ns = Namespace("users", description="User operations")
token_ns = Namespace("token", description="Token operations")

post_repo = PostRepository()
user_repo = UserRepository()


@category_ns.route("/", defaults={"id": None})
class CategoryList(BaseMixin):
    pass


@post_ns.route("/")
class PostList(Resource):
    @post_ns.doc("list_posts")
    @post_ns.marshal_list_with(post_fields, envelope="results")
    @post_ns.expect(post_parser)
    def get(self):
        """
        List all posts
        This endpoint get all posts on the server.
        """
        args = post_parser.parse_args()
        return post_repo.get_all(**args)

    def post(self):
        """
        Create a new post.
        This endpoint creates a new post on the server.
        """
        return {"message": "Post created"}, 201


# @post_ns.route("/<int:id>")
# @post_ns.param("id", "The post identifier")
# @post_ns.response(404, "Post not found")
# class Post(Resource):
#     @post_ns.doc("get_post")
#     @post_ns.marshal_with(post)
#     def get(self, id):
#         """Fetch a post given its identifier"""
#         return post_repo.get_by_id(id) or abort(404)

#     @post_ns.doc("update_post", security="jwt")
#     @post_ns.marshal_with(post, code=200)
#     def put(self):
#         """Update post"""
#         pass

#     @post_ns.doc("remove_post", security="jwt")
#     @post_ns.marshal_with(post, code=200)
#     def delete(self):
#         """Remove post"""
#         pass


# @user_ns.route("/")
# class User(Resource):
#     @user_ns.doc("create_user")
#     @user_ns.expect(user_parser)
#     @user_ns.marshal_with(new_user, code=201)
#     def post(self):
#         """Create a new user"""
#         avatar_url = None
#         args = user_parser.parse_args()
#         avatar = args["avatar"]

#         errors = user_repo.is_exists(args["email"], args["username"])

#         if errors:
#             abort(400, message="User with this email or username already exists.", errors=errors)

#         if avatar:
#             avatar_url = upload_image(file_data=avatar)

#         new_user = user_repo.create(
#             username=args["username"],
#             email=args["email"],
#             password=args["password"],
#             avatar=avatar_url,
#         )

#         return new_user, 201


# @token_ns.route("/")
# class Token(Resource):
#     @token_ns.doc("create_token")
#     @token_ns.expect(login)
#     def post(self):
#         """Get access token"""
#         user = user_repo.auth_user(
#             email=token_ns.payload["email"], password=token_ns.payload["password"]
#         )

#         if not user:
#             return jsonify(message="Invalid email or password"), 401

#         access_token = create_access_token(identity=user, fresh=True)
#         refresh_token = create_refresh_token(identity=user)

#         return jsonify(
#             access_token=access_token,
#             refresh_token=refresh_token,
#             httponly=True,
#             secure=True,
#             samesite="Strict",
#         )


# @user_ns.route("/current-user/")
# class CurrentUser(Resource):
#     method_decorators = [jwt_required(optional=True)]

#     @user_ns.doc("get_current_user", security="jwt")
#     @user_ns.marshal_with(profile, code=200)
#     def get(self):
#         """Get current user"""
#         return user_repo.get_by_id(id=current_user.id) or abort(401)

#     @user_ns.doc("update_profile", security="jwt")
#     @user_ns.expect(profile_parser)
#     @user_ns.marshal_with(user, code=200)
#     def put(self):
#         """Update user profile"""
#         pass


# @user_ns.route("/current-user/set-password")
# class SetPassword(Resource):
#     method_decorators = [jwt_required(optional=True)]

#     @user_ns.doc("set_password", security="jwt")
#     @user_ns.expect(password_parser)
#     def post(self):
#         """Set a new password for the current user"""
#         args = password_parser.parse_args()

#         password = args["password"]
#         new_password = args["new_password"]

#         if not check_password_hash(current_user.password, password):
#             abort(400, message="Old password is incorrect")

#         if check_password_hash(current_user.password, new_password):
#             abort(400, message="New password cannot be the same as the old password")

#         current_user.password = generate_password_hash(new_password)
#         current_user.save()

#         return {"message": "Password updated successfully"}, 200


# @user_ns.route("/current-user/avatar")
# class Avatar(Resource):
#     method_decorators = [jwt_required(optional=True)]

#     @user_ns.doc("update_avatar", security="jwt")
#     @user_ns.expect(update_parser)
#     @user_ns.marshal_with(profile, code=200)
#     def put(self):
#         """Update avatar user"""
#         avatar_url = None
#         args = update_parser.parse_args()
#         avatar = args["avatar"]

#         if avatar:
#             avatar_url = upload_image(file_data=avatar)

#         current_user.avatar = avatar_url

#         return current_user, 200


# @post_ns.route("/<int:id>/comments")
# @post_ns.param("id", "The post identifier")
# @post_ns.response(404, "Post not found")
# class CommentList(Resource):
#     @post_ns.doc("list_comments")
#     @post_ns.marshal_list_with(comment, envelope="results")
#     def get(self, id):
#         """
#         List all comments
#         This endpoint get all comment of a post on the server.
#         """
#         return post_repo.filter_comments(id=id) or abort(404, message="Post not found")

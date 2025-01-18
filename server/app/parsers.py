from flask_restx import reqparse
from werkzeug.datastructures import FileStorage

post_parser = reqparse.RequestParser()
post_parser.add_argument("keyword", type=str, required=False, help="Title of the post")

user_parser = reqparse.RequestParser()
user_parser.add_argument("username", type=str, required=True, location="form")
user_parser.add_argument("email", type=str, required=True, location="form")
user_parser.add_argument("first_name", type=str, required=True, location="form")
user_parser.add_argument("last_name", type=str, required=True, location="form")
user_parser.add_argument("password", type=str, required=True, location="form")
user_parser.add_argument("avatar", required=False, type=FileStorage, location="files")

profile_parser = user_parser.copy()
profile_parser.remove_argument("password")

password_parser = reqparse.RequestParser()
password_parser.add_argument("password", type=str, required=True, location="form")
password_parser.add_argument("new_password", type=str, required=True, location="form")

update_parser = reqparse.RequestParser()
update_parser.add_argument("avatar", required=True, type=FileStorage, location="files")

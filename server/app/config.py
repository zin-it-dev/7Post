import secrets, cloudinary

from os import path, getenv
from datetime import timedelta
from flask import Config

base_dir = path.abspath(path.dirname(__file__))
file_path = path.join(path.dirname(__file__), "static")
cdn_ckeditor = ["//cdn.ckeditor.com/4.6.0/full-all/ckeditor.js"]


class BaseConfig(Config):
    SECRET_KEY = secrets.token_hex()
    JWT_SECRET_KEY = secrets.token_hex()
    REMEMBER_COOKIE_DURATION = timedelta(days=7)
    FLASK_ADMIN_SWATCH = "lux"

    cloudinary.config(
        cloud_name=getenv("CLOUD_NAME"),
        api_key=getenv("API_KEY"),
        api_secret=getenv("API_SECRET"),
    )


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(base_dir, "database", "7post.db")
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_ECHO = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False


configs = dict(development=DevelopmentConfig)

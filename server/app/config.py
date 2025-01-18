import secrets, cloudinary
from os import path, getenv

from flask import Config

base_dir = path.abspath(path.dirname(__file__))


class BaseConfig(Config):
    SECRET_KEY = secrets.token_hex()
    JWT_SECRET_KEY = secrets.token_hex()

    cloudinary.config(
        cloud_name=getenv("CLOUD_NAME"),
        api_key=getenv("API_KEY"),
        api_secret=getenv("API_SECRET"),
    )


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(base_dir, "database", "7post.db")


configs = dict(development=DevelopmentConfig)

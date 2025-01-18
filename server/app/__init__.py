from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from .extensions import api
from .config import configs
from .dao import get_users, get_callback_users
from .admin import admin_manager
from .resources import post_ns, user_ns, token_ns


def create_app(config_name="development"):
    app = Flask(__name__)

    app.config.from_object(configs[config_name])

    api.init_app(app)
    api.add_namespace(post_ns)
    api.add_namespace(user_ns)
    api.add_namespace(token_ns)

    from .models import db

    db.init_app(app)

    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)
    admin_manager.init_app(app)

    @login_manager.user_loader
    def loader_user(user_id):
        return get_users(id=user_id)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return get_callback_users(identity)

    return app

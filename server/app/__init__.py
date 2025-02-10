from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_jwt_extended import JWTManager


from .extensions import api, cors, debug_toolbar
from .config import configs
from .dao import UserRepository
from .admin import admin_manager, babel
from .resources import post_ns, user_ns, token_ns
from .controllers import auth_admin
from .models import db

user_repo = UserRepository()

def create_app(config_name="development"):
    app = Flask(__name__)

    app.config.from_object(configs[config_name])
    
    if app.debug:
        debug_toolbar.init_app(app)

    app.add_url_rule("/auth-admin", view_func=auth_admin, methods=["POST"])

    api.init_app(app)
    api.add_namespace(post_ns)
    api.add_namespace(user_ns)
    api.add_namespace(token_ns)

    db.init_app(app)
    cors.init_app(app)

    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    jwt = JWTManager(app)
    
    admin_manager.init_app(app)
    babel.init_app(app)
    
    @login_manager.user_loader
    def loader_user(user_id):
        return user_repo.get_by_id(id=user_id)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return user_repo.get_callback_users(identity)
    
    return app

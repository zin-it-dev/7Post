from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from .models import db, User, Post, Comment, Tag

admin_manager = Admin(name="7Post - Admin 📮", template_mode="bootstrap4")

admin_manager.add_view(ModelView(User, db.session))
admin_manager.add_view(ModelView(Post, db.session))

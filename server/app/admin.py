from flask_admin import Admin, BaseView, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask_admin.actions import action
from flask_admin.form import SecureForm
from flask_admin.contrib.fileadmin import FileAdmin
from flask_login import current_user, logout_user
from flask_babel import Babel
from flask import url_for, redirect
from wtforms import PasswordField
from wtforms.validators import DataRequired, EqualTo
from werkzeug.security import generate_password_hash
from flask_wtf.file import FileField, FileAllowed

from .decorators import admin_required
from .models import db, User, Post, Comment, Tag, Category
from .config import cdn_ckeditor, file_path
from .utils import get_locale, upload_image
from .actions import make_active
from .widgets import CKTextAreaField
from .dao import AnalyticsRepository


class SecureView(BaseView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin


class CommonView(ModelView, SecureView):
    form_base_class = SecureForm
    column_list = ["active", "date_created"]
    column_filters = ["active"]
    column_editable_list = ["active"]
    column_sortable_list = ["date_created"]
    create_modal = True
    edit_modal = True
    can_view_details = True
    can_export = True
    can_delete = True
    page_size = 50

    @action(
        "activate",
        "Activate",
        "Are you sure you want to change the active status of selected models?",
    )
    def action_activate(self, ids):
        return make_active(self=self, ids=ids)


class UserView(CommonView):
    column_list = ["username", "email", "posts"] + CommonView.column_list
    column_editable_list = ["username", "email"] + CommonView.column_editable_list

    form_extra_fields = dict(
        password=PasswordField(
            "Password",
            validators=[
                DataRequired(),
                EqualTo("confirm_password", message="Passwords must match."),
            ],
        ),
        confirm_password=PasswordField("Confirm Password", validators=[DataRequired()]),
    )

    def on_model_change(self, form, model, is_created):
        model.password = generate_password_hash(model.password)


class CategoryView(CommonView):
    column_list = ["label", "posts"] + CommonView.column_list
    column_editable_list = ["label"] + CommonView.column_editable_list


class PostView(CommonView):
    extra_js = cdn_ckeditor
    form_overrides = {"content": CKTextAreaField}

    form_extra_fields = {
        "image": FileField(
            "Image",
            validators=[FileAllowed(["jpg", "png"], "Only images are allowed!")],
        )
    }

    inline_models = [Tag]
    column_list = ["title", "image", "category", "tags", "user"] + CommonView.column_list
    column_searchable_list = ["title"]
    column_editable_list = [
        "title",
        "image",
        "category",
        "tags",
        "user",
    ] + CommonView.column_editable_list
    column_sortable_list = ["title"] + CommonView.column_sortable_list

    def on_model_change(self, form, model, is_created):
        if "image" in form.data and form.data["image"]:
            file = form.data["image"]
            model.image = upload_image(file)


class CommentView(CommonView):
    column_list = ["content", "user", "post"] + CommonView.column_list
    column_searchable_list = ["content"]
    column_editable_list = [
        "user",
        "post",
    ] + CommonView.column_editable_list
    column_sortable_list = ["content"] + CommonView.column_sortable_list
    column_filters = CommonView.column_filters + ["user.username"]


class TagView(CommonView):
    column_list = ["label"] + CommonView.column_list
    column_editable_list = ["label"] + CommonView.column_editable_list


class AnalyticsView(SecureView):
    @expose("/")
    def index(self):
        return self.render("admin/analytics.html")


class LogoutView(SecureView):
    @admin_required
    @expose("/")
    def index(self):
        logout_user()
        return redirect(url_for("admin.index"))


class FileView(SecureView, FileAdmin):
    pass


class AdminIndex(AdminIndexView):
    @expose("/")
    def index(self):
        return self.render(
            "admin/index.html",
            stats=AnalyticsRepository.stats_posts_by_category(),
        )


babel = Babel(locale_selector=get_locale)
admin_manager = Admin(name="7Post - Admin 📮", template_mode="bootstrap4", index_view=AdminIndex())

admin_manager.add_view(UserView(User, db.session, category="Management"))
admin_manager.add_view(CategoryView(Category, db.session, category="Management"))
admin_manager.add_view(PostView(Post, db.session, category="Management"))
admin_manager.add_view(CommentView(Comment, db.session, category="Management"))
admin_manager.add_view(TagView(Tag, db.session, category="Management"))
admin_manager.add_view(AnalyticsView(name="Analytics", endpoint="analytics"))
admin_manager.add_view(FileView(file_path, "/static/", name="Files", category="Settings"))
admin_manager.add_view(LogoutView(name="Log Out", endpoint="logout", category="Settings"))

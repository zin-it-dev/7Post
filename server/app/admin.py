from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.form import SecureForm

from .models import db, User, Post, Comment, Tag, Category, Comment

admin_manager = Admin(name="7Post - Admin 📮", template_mode="bootstrap4")


class CommonView(ModelView):
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
    page_size = 10


class CategoryView(CommonView):
    column_list = ["label", "posts"] + CommonView.column_list
    column_editable_list = ["label"] + CommonView.column_editable_list


class PostView(CommonView):
    inline_models = [Tag]
    column_list = ["title", "category"] + CommonView.column_list
    column_searchable_list = ["title"]
    column_editable_list = [
        "title",
        "category",
    ] + CommonView.column_editable_list
    column_sortable_list = ["title"] + CommonView.column_sortable_list


class CommentView(CommonView):
    column_list = ["content", "user", "post"] + CommonView.column_list
    column_searchable_list = ["content"]
    column_editable_list = [
        "user",
        "post",
    ] + CommonView.column_editable_list
    column_sortable_list = ["content"] + CommonView.column_sortable_list


admin_manager.add_view(ModelView(User, db.session))
admin_manager.add_view(CategoryView(Category, db.session))
admin_manager.add_view(PostView(Post, db.session))
admin_manager.add_view(CommentView(Comment, db.session))

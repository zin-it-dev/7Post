from flask import request, url_for, flash, redirect
from flask_login import login_user

from .dao import UserRepository

user_repo = UserRepository()

def auth_admin():
    email = request.form.get("email")
    password = request.form.get("password")
    remember = request.form.get("remember")

    user = user_repo.auth_user(email=email, password=password)

    if user and user.is_admin:
        login_user(user, remember=remember)
        flash("Welcome, admin! You are successfully logged in.", "success")
    else:
        flash("Invalid email or password. Please try again.", "warning")

    return redirect(url_for("admin.index"))

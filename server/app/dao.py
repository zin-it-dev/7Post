from .models import User, Post


def get_users(id):
    return User.query.get(id)


def get_posts(keyword):
    queries = Post.query.filter(Post.active.__eq__(True))

    if keyword:
        queries = queries.filter(Post.title.contains(keyword))

    return queries.order_by(Post.title).all()


def get_post(id):
    return Post.query.get(int(id))


def get_callback_users(identity):
    return User.query.filter_by(id=identity).one_or_none()


def create_user(username, email, password, **kwargs):
    user = User(username=username, email=email, password=password, **kwargs)
    user.save()
    return user


def check_user_duplicates(username, email):
    errors = {}

    if User.query.filter(User.username.__eq__(username)).first():
        errors["username"] = "Username is already taken"

    if User.query.filter(User.email.__eq__(email)).first():
        errors["email"] = "Email is already registered"

    return errors


def auth_user(email, password):
    user = User.query.filter(User.email.__eq__(email)).first()
    return user if user and user.check_password(password=password) else None


def update_user(user_id, **kwargs):
    user = User.query.get(user_id)

    if not user:
        return None

    for key, value in kwargs.items():
        setattr(user, key, value)
    user.save()
    return user

import hashlib, cloudinary.uploader


def hash_avatar_url(email, size=128, default="identicon", rating="g"):
    digest = hashlib.md5(email.lower().encode("utf-8")).hexdigest()
    return f"https://www.gravatar.com/avatar/{digest}?s={size}&d={default}&r={rating}"


def upload_image(file_data):
    result = cloudinary.uploader.upload(file_data)
    return result.get("secure_url")

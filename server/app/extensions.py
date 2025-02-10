from flask_restx import Api
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension

authorizations = {
    "jwt": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Type in the *'Value'* input box below: **'Bearer &lt;JWT&gt;'**, where JWT is the token",
    }
}

api = Api(
    contact="zin.it.dev@gmail.com",
    contact_email="zin.it.dev@gmail.com",
    version="1.0",
    title="7Post 📮 - Swagger UI",
    description=(
        "Documents API for `7Post` 📯\n\n"
        "This API provides a robust and scalable platform for managing an online blog application. "
        "Use this API to build a powerful and user-friendly blog experience."
    ),
    license="Apache 2.0",
    terms_url="https://www.google.com/policies/terms/",
    authorizations=authorizations,
    validate=True,
    ordered=True,
)

cors = CORS(resources={r"/*": {"origins": "*"}}, supports_credentials=True)
debug_toolbar = DebugToolbarExtension()
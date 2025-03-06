from flask_restx import Resource


class BaseMixin(Resource):
    def get(self):
        return {"message": "Get all items"}

    def get(self, id=None):
        return {"message": "Get id"}

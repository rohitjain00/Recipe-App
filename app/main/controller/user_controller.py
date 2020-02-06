from flask import request
from flask_restplus import Resource

from ..util.dto import UserDto
from ..service.user_service import register, login, logout

api = UserDto.api
_user = UserDto.user


@api.route('/register')
class UserRegistration(Resource):
    @api.doc("creates a new user")
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return register(data=data)


@api.route('/login')
class UserLogin(Resource):
    @api.doc("user login")
    @api.expect(_user, validate=True)
    def post(self):
        """Login a user"""
        post_data = request.json
        return login(data=post_data)


@api.route('/logout')
class UserLogout(Resource):
    @api.doc("User")
    def post(self):
        """Logout a user"""
        return logout(request.headers)

from app.admin import bp
from flask_jwt_extended import jwt_required, get_jwt_identity,current_user
from app.auth.admin_routes import admin_required
from app.models import Admin
from flask import jsonify

@bp.route('')
@admin_required()
def my_profile():

    return jsonify(
        id=current_user.id,
        username=current_user.username,
        msg="Hello admin"
    )


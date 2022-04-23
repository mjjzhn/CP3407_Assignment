from app.admin import bp
from flask_jwt_extended import jwt_required
import json
from flask_cors import cross_origin
from app.auth.admin_routes import admin_required

@bp.route('')
@admin_required()
def my_profile():
    response_body = {
        "name": "admin homepage",
        "about" :"Here is admin homepage"
    }
    return response_body


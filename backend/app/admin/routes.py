from app.admin import bp
from flask_jwt_extended import jwt_required, current_user
import json
from app.auth.admin_routes import admin_required
from flask import jsonify,request, current_app
from app import db
from app.models import Admin
from app.errors import bad_request



@bp.route('')
@admin_required()
def my_profile():
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        msg="Hello admin"
    )


@bp.route('/update', methods=["PUT"])
@admin_required()
def update_profile():
    if request.method == 'PUT':
        data = request.get_json() or {}
        if 'username' in data and data['username'] != current_user.username and \
            Admin.query.filter_by(username=data['username']).first():
            return bad_request('please use a different username')
        if "password" in data:
            if 'currentPassword' not in data:
                return bad_request("Please provide your current password")
        if 'currentPassword' in data and not current_user.check_password(data["currentPassword"]):
            return bad_request("Current password incorrect")
        current_user.from_dict(data)
        db.session.commit()
        response = current_user.to_dict()
        if "password" in data:
            response["is_password_updated"] = True
        return jsonify(response)

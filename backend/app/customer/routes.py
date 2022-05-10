from app.admin import bp
from app.auth.customer_routes import customer_required
from flask import jsonify, request
from flask_jwt_extended import current_user
from app.errors import bad_request
from backend.app import db, models
from backend.app.models import Customer


@bp.route('')
@customer_required
def my_profile():
    return jsonify(
        id=current_user.id,
        username = current_user.username,
        msg="Hello " + current_user.username
    )

@bp.route('/update', methods=["POST"])
@customer_required
def update_profile():
    if request.method == 'POST':
        data = request.get_json() or {}
        if 'username' in data and data['username'] != current_user.username and \
            Customer.query.filter_by(username=data['username']).first():
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

@bp.route('/register', methods=["POST"])
@customer_required
def customer_register():
    if request.method == 'POST':
        data = request.get_json() or {}
        if 'username' in data and data['username'] != current_user.username and \
            Customer.query.filter_by(id=data['username']).first():
            return bad_request('User exists, please ues a different username')
        pwencode = data["password"].encode("utf-8")
        '''
        to decode the password, use password.decode("utf-8") would give you the original text
        '''
        params = dict(username=data["username"],password=pwencode)
        role = models.Customer(**params)
        db.session.add(role)
        db.session.commit()
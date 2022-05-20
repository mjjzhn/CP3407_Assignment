from app.customer import bp
from app.auth.customer_routes import customer_required
from flask import jsonify, request, current_app
from flask_jwt_extended import current_user
from app.errors import bad_request
from app import db, models
from app.models import Customer, Order, Order_item, Item
from app import cloudinary
#this file is for control user settings.

@bp.route('')
@customer_required()
def my_profile():
    return current_user.to_dict()

@bp.route('/update', methods=["PUT"])
@customer_required()
def update_profile():
    #updating task will be changed to form data, now we use json for test
    if request.method == 'PUT':
        data = request.form.to_dict() or {}
        if 'username' in data and data['username'] != current_user.username and \
            Customer.query.filter_by(username=data['username']).first():
            return bad_request('please use a different username')
        if "password" in data:
            if 'currentPassword' not in data:
                return bad_request("Please provide your current password")
        if 'currentPassword' in data and not current_user.check_password(data["currentPassword"]):
            return bad_request("Current password incorrect")
        
        #change avatar
        current_app.logger.info('in admin/update route')
        upload_result = None
        if "avatar" in request.files:
            file_to_upload = request.files['avatar']
            current_app.logger.info('%s file_to_upload', file_to_upload)
            if file_to_upload:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                current_app.logger.info(upload_result)
                data['avatar']=upload_result["secure_url"]
        
        current_user.from_dict(data)
        db.session.commit()
        response = current_user.to_dict()
        if "password" in data:
            response["is_password_updated"] = True
        return jsonify(response)

@bp.route('/favorite', methods=["GET"])
@customer_required()
def get_favourite_items():
    return jsonify(current_user.get_favourite()),200

@bp.route('/favorite/<id>', methods=["POST"])
@customer_required()
def add_to_favourite(id):
    item = Item.query.get_or_404(id)
    current_user.add_to_favorite(id)
    return jsonify(current_user.get_favourite()),200

@bp.route('/favorite/<id>', methods=["DELETE"])
@customer_required()
def remove_from_favourite(id):
    id= int(id)
    # item = Item.query.get_or_404(id)
    current_user.remove_from_favourite(id)
    return jsonify(current_user.get_favourite()),200



# @bp.route('/check_out', methods=["POST"])#check_out
# @customer_required
# def check_out():
#     data = request.get_json() or {}
#     new_order = Order(customer_id=current_user.id)
#     new_order.set_status_order_received()
#     db.session.add(new_order)
#     db.session.commit()
#     for item in data["items"]:
#         new_order.add_item(item["id"],item["quantity"])
#     return jsonify(new_order.to_dict())    
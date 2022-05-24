from app.customer import bp
from app.auth.customer_routes import customer_required
from flask import jsonify, request, current_app
from flask_jwt_extended import current_user
from app.errors import bad_request
from app import db, models
from app.models import Customer, Order, Order_item, Item, Contact_form
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
            if data["password"]:
                if 'currentPassword' not in data:
                    return bad_request("Please provide your current password")
                if 'currentPassword' in data and not current_user.check_password(data["currentPassword"]):
                    return bad_request("Current password incorrect")
        else:
            if "currentPassword" in data:
                del data["currentPassword"]
                
        for field in ["phone", "postal_code"]:
            if field in data:
                if data[field]:
                    try:
                        data[field] = int(data[field])
                    except ValueError:
                        return bad_request(f"Please provide an integer for {field} field!") 
                       
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

@bp.route('/favourite', methods=["GET"])
@customer_required()
def get_favourite_items():
    return jsonify(current_user.get_favourite()),200

@bp.route('/favourite/<id>', methods=["POST"])
@customer_required()
def add_to_favourite(id):
    item = Item.query.get_or_404(id)
    current_user.add_to_favorite(id)
    return jsonify(current_user.get_favourite()),200

@bp.route('/favourite/<id>', methods=["DELETE"])
@customer_required()
def remove_from_favourite(id):
    id= int(id)
    # item = Item.query.get_or_404(id)
    current_user.remove_from_favourite(id)
    return jsonify(current_user.get_favourite()),200


@bp.route('/orders', methods=["GET"])
@customer_required()
def get_shopping_history():
    # data = Order.to_collection_dict(current_user.orders.all(), 'customer.get_shopping_history')
    # return jsonify(data),200
    return jsonify(current_user.get_orders()),200

@bp.route('/contact', methods=["POST"])
@customer_required()
def contact_to_shop():
    data = request.form.to_dict() or {}
    for field in ["subject","email","message"]:
        if field not in data:
            return bad_request(f"Please include {field} field")
    if "customer_id" not in data:
        data["customer_id"] = current_user.id
    if "full_name" not in data:
        data["full_name"] = current_user.customer_name
    if not isinstance(data["customer_id"], int):
        return bad_request(f"Please provide an integer for {field} field")
    
    new_message = Contact_form()
    new_message.from_dict(data)
    db.session.add(new_message)
    db.session.commit()
    return jsonify(new_message.to_dict())

@bp.route('/contact/get', methods=["GET"])
@customer_required()
def get_all_contacts():
    data = Contact_form.to_collection_dict(current_user.contact_forms.all(), 'customer.get_all_contacts')
    return jsonify(data),200 

@bp.route('/contact/get/<id>', methods=["GET"])
@customer_required()
def get_contact(id):
    return jsonify(current_user.contact_forms.filter_by(id=id).first().to_dict()),200 
    
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
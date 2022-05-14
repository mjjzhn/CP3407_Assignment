from app.customer import bp
from app.auth.customer_routes import customer_required
from flask import jsonify, request
from flask_jwt_extended import current_user
from app.errors import bad_request
from app import db, models
from app.models import Customer, Order, Order_item, Item


@bp.route('')
@customer_required()
def my_profile():
    return current_user.to_dict()

@bp.route('/update', methods=["POST"])
@customer_required()
def update_profile():
    #updating task will be changed to form data, now we use json for test
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
        current_user.set_username(data['username'])
        current_user.set_password(data['password'])
        db.session.commit()
        response = current_user.to_dict()
        if "password" in data:
            response["is_password_updated"] = True
        return jsonify(response)

@bp.route('/favorite', methods=["GET"])
@customer_required()
def get_favourite_items():
    return jsonify(current_user.get_favourite())

@bp.route('/favorite/<id>', methods=["POST"])
@customer_required()
def add_to_favourite(id):
    item = Item.query.get_or_404(id)
    current_user.add_to_favorite(id)
    return jsonify(current_user.get_favourite())

@bp.route('/favorite/<id>', methods=["DELETE"])
@customer_required()
def remove_from_favourite(id):
    id= int(id)
    # item = Item.query.get_or_404(id)
    current_user.remove_from_favourite(id)
    return jsonify(current_user.get_favourite())



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
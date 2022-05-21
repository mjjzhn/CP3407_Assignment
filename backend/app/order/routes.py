from app.order import bp
from flask import jsonify
from app.models import Order, Item
from flask import request
from app.errors import bad_request
from app import db,stripe
from flask import url_for,current_app
from app.auth.admin_routes import admin_required
from app.auth.customer_routes import customer_required
from flask_jwt_extended import current_user

@bp.route('', methods =["GET"])
@admin_required()
def get_orders():
    data = Order.to_collection_dict(Order.query.all(), 'order.get_orders')
    return jsonify(data),200

@bp.route('/<int:id>', methods =["GET"])
def get_order(id):
    return jsonify(Order.query.get_or_404(id).to_dict())

@bp.route('/create', methods =["POST"])
@customer_required()
def create_order():
    data = request.get_json() or {}
    for field in ["items"]:
        if field not in data:
            return bad_request("Must include the {} field".format(field))
    if "customer_id" not in data:
        data["customer_id"]= current_user.id
    
    for field in ["total_amount"]:
        if field not in data:
            total_amount = 0
            for item in data["items"]:
                total_amount = total_amount + item["item_price"]*item["quantity"] 
            data["total_amount"] = total_amount
            
    if not isinstance(data["customer_id"], int):
        return bad_request("please give {} an integer value!".format("customer_id"))
    
    if len(data["items"]) <=0:
        return bad_request("Please select items to make order!")
    
    for item in data["items"]:
        for field in ["item_id","quantity", "item_size","item_price"]:
            if field not in item:
                return bad_request("must include {} field.".format(field))
        for field in ["item_id","quantity"]:
            if not isinstance(item[field], int):
                return bad_request("please give {} an integer value!".format(field))
    
    for item in data["items"]:
        selected_item =Item.query.get_or_404(item["item_id"])
        if not selected_item.check_quantity_available(item["quantity"],item["item_size"]):
            return bad_request("There is not enough {} to make an order".format(selected_item["item_name"]))
    
    new_order = Order(customer_id=data["customer_id"])
    new_order.set_status_order_unpaid()
    db.session.add(new_order)
    db.session.commit()
    for item in data["items"]:
        new_order.add_item(item["item_id"],item["quantity"],item["item_size"],item["item_price"])
    db.session.commit()
    
    response={}
    total_amount_in_cent = int(100*data["total_amount"])#1 dollar =100 cents
    intent = stripe.PaymentIntent.create(
        # amount=data["total_amount"],
        amount=total_amount_in_cent, 
        currency='sgd',
        metadata={"order_id":new_order.id}
    )
    response["order_id"]=new_order.id
    response["client_secret"]=intent['client_secret']
    return response,200

@bp.route('/webhook', methods=['POST'])
def webhook():
    endpoint_secret = current_app.config["ENDPOINT_SECRET"]
    payload = request.get_data()
    sig_header = request.headers.get('Stripe_Signature', None)

    if not sig_header:
        return 'No Signature Header!', 400

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return 'Invalid signature', 400

    if event['type'] == 'payment_intent.succeeded':
        order_id = event['data']['object']['metadata']["order_id"] # contains the email that will recive the recipt for the payment (users email usually)
        unpaid_order=Order.query.get(order_id)
        unpaid_order.set_status_order_received()
    else:
        return 'Unexpected event type', 400
    return '', 200

@bp.route('/<int:id>', methods =["PUT"])
@admin_required()
def adjust_order(id):
    current_order = Order.query.get_or_404(id)
    data = request.get_json() or {}
    if  'id' in data and data['id'] != current_order.id:
        return bad_request('You can not change id of this order')
    
    if "order_status" in data:
        if data["order_status"] not in Order.status:
            return bad_request('Select status from this list {}'.format(Order.status))
    
    for field in ["customer_id"]:
        if field in data:
            if not isinstance(data[field], int):
                return bad_request("please give {} an integer value!".format(field))
            
    current_order.from_dict(data)
    if "items" in data:
        for item in data["items"]:
            for field in ["item_id","quantity","item_size","item_price"]:
                if field not in item:
                    return bad_request(f"must include {field}")
            for field in ["item_id","quantity"]:
                if not isinstance(item[field], int):
                    return bad_request("please give {} an integer value!".format(field))
                
    if "add_item" in data and data["add_item"]:
        for item in data["items"]:
            selected_item =Item.query.get_or_404(item["item_id"])
            if not selected_item.check_quantity_available(item["quantity"],item["item_size"]):
                return bad_request("There is not enough {} to make an order".format(selected_item["item_name"]))
            current_order.add_item(item["item_id"],item["quantity"],item["item_size"], item["item_price"])
    else:
        current_order.remove_all_item()
        for item in data["items"]:
            selected_item =Item.query.get_or_404(item["item_id"])
            if not selected_item.check_quantity_available(item["quantity"],item["item_size"]):
                return bad_request("There is not enough {} to make an order".format(selected_item["item_name"]))
            current_order.add_item(item["item_id"],item["quantity"],item["item_size"],item["item_price"])
    return jsonify(current_order.to_dict())
        
        
@bp.route('/<int:id>', methods =["DELETE"])
# @admin_required()
def remove_order(id):
    id = int(id)
    current_order = Order.query.get_or_404(id)
    current_order.remove_all_item()
    db.session.delete(current_order)
    db.session.commit()
    return "delete order {}".format(id),200


@bp.route('/<int:id>/nextStep', methods =["PUT"])
def move_order_status(id):
    id = int(id)
    current_order = Order.query.get_or_404(id)
    if current_order.order_status== Order.unpaid_status:
        return bad_request("Please pay for this order")
    position = 0
    for i in range(len(Order.status)):
        if current_order.order_status == Order.status[i]:
            position= i
    if position +1 <len(Order.status):
        current_order.order_status = Order.status[position+1]
        db.session.commit()
    return jsonify(current_order.to_dict()),200

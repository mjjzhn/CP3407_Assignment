from app.menu import bp
from flask import jsonify
from app.models import Item
from flask import request
from app.errors import bad_request
from app import db
from flask import url_for

@bp.route('/items', methods =["GET"])
def get_items():
    data = Item.to_collection_dict(Item.query.all(), 'menu.get_items')
    return jsonify(data)


@bp.route('/items/<int:id>', methods =["GET"])
def get_item(id):
    return jsonify(Item.query.get_or_404(id).to_dict())

@bp.route('/items/<int:id>', methods =["PUT"])
#authentication control here
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json() or {}
    if  'id' in data and data['id'] != item.id:
        return bad_request('You can not change id of this item')
    item.from_dict(data)
    db.session.commit()
    return jsonify(item.to_dict())

@bp.route('/items/create', methods =["GET","POST"])
#authentication control here
def create_item():
    if request.method == 'GET':
        #basic information before create an item
        data ={
            "id": "automatical",
            "item_name":"an unique item name (String)",
            "item_category": [category for category in Item.category],
            "item_image_link": "image_url",
            "item_description": "short description for item",
            "item_base_price":"price in Float",
            "size_plus_price":"difference between prices",
            "num_of_item": "integer",
            "size_list": Item.available_size_lists,
            "available": "boolean", 
        }
        response = jsonify(data)
        return response
    else:
        has_id_field = False
        data = request.get_json() or {}
        for field in ['item_name',"item_category","item_image_link", "item_description","item_base_price", "size_plus_price","num_of_item","size_list"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
        if not Item.validate_category(data["item_category"]):
            return bad_request("Please provide proper item_category: "+str(Item.category))
        if not Item.validate_size_list(data["size_list"]):
            if not data["size_list"]:
                data["size_list"]="S/M/L"
            else:
                return bad_request("Only accept size list from "+ str(Item.available_size_lists.items()))
        
        if 'id' in data:
            has_id_field =True
        item = Item()
        if has_id_field:
            data.pop('id')
        item.from_dict(data)
        db.session.add(item)
        db.session.commit()
        msg =item.to_dict()
        if has_id_field:
            msg["_warning"] =["The id of item will be set automatically"]
        response = jsonify(msg)
        response.status_code = 201
        response.headers['Location'] = url_for('menu.get_item', id=item.id)
        # response ="hello reachable"
        return response

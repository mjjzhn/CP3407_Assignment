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
    #now I will interact with json, However, when implement cms, everthing need to be change to form data
    item = Item.query.get_or_404(id)
    data = request.get_json() or {}
    # data = request.form.to_dict() or {}
    if  'id' in data and data['id'] != item.id:
        return bad_request('You can not change id of this item')
    
    if "item_name" in data:
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')

    if "item_category" in data:
        for attribute in ["gender","top","bottom"]:
            if attribute not in data["item_category"]:
                return bad_request(f"please provide {attribute} for item_category")
    
    if "unavailable_sizes" in data:
        if data["unavailable_sizes"]:
            if not Item.validate_size(data["unavailable_sizes"],item.item_sizes):
                return bad_request('Please provide proper unavailable_sizes'+ str(data["item_sizes"]))
    
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
            "item_price":"price in Float",
            "num_of_item": "integer",
            "item_sizes": Item.available_size_lists,
            "discount": "discount percentage",
            "unavailable_sizes":Item.available_size_lists,
            "is_hot": "is the item a trend or not",
            "available": "boolean"
        }
        response = jsonify(data)
        return response
    else:
        has_id_field = False
        data = request.get_json() or {}
        for field in ['item_name',"item_category","item_image_link", "item_description","item_price","item_sizes","num_of_item","colors"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
        
        if "item_category" in data:
            for attribute in ["gender","top","bottom"]:
                if attribute not in data["item_category"]:
                    return bad_request(f"please provide {attribute} for item_category")
                
        if "unavailable_sizes" in data:
            if data["unavailable_sizes"]:
                if not Item.validate_size(data["unavailable_sizes"],data["item_sizes"]):
                    return bad_request('Please provide proper unavailable_sizes'+ str(data["item_sizes"]))
        
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
        return response


@bp.route('/items/create/multiple', methods =["POST"])
#authentication control here
def create_multiple_item():
    for data in request.get_json() or []:
        has_id_field = False
        for field in ['item_name',"item_category","item_image_link", "item_description","item_price","item_sizes","num_of_item","colors"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
            
        if "item_category" in data:
            for attribute in ["gender","top","bottom"]:
                if attribute not in data["item_category"]:
                    return bad_request(f"please provide {attribute} for item_category")
                    
        if "unavailable_sizes" in data:
            if data["unavailable_sizes"]:
                if not Item.validate_size(data["unavailable_sizes"],data["item_sizes"]):
                    return bad_request('Please provide proper unavailable_sizes'+ str(data["item_sizes"]))
            
        if 'id' in data:
            has_id_field =True
        item = Item()
        if has_id_field:
            data.pop('id')
        item.from_dict(data)
        db.session.add(item)
    
    db.session.commit()
    return f"just add {len(request.get_json())}"   
        
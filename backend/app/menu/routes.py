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
    
    if "item_name" in data:
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
            
    #check the category and subtype
    if "item_category" and "item_subtype" in data:
        if not Item.validate_category_subtype(data["item_category"],data["item_subtype"]):
            msg ="Please provide proper item_category: "+str(Item.category)
            msg += "\n"
            msg+= "Please provide proper item_subtype: "+str(Item.subtype)
            return bad_request(msg)
    # if not Item.validate_category(data["item_category"]):
    #     return bad_request("Please provide proper item_category: "+str(Item.category))
    # if not Item.validate_subtype(data["item_subtype"]):
    #     return bad_request("Please provide proper item_subtype: "+str(Item.subtype))
        
    #select correct item_sizes based on the subtype
    #change later on
    if "item_subtype" in data:
        data["item_sizes"] = Item.available_size_lists[data["item_subtype"].lower()]
    
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
            "item_subtype": [subtype for subtype in Item.subtype],
            "item_image_link": "image_url",
            "item_description": "short description for item",
            "item_price":"price in Float",
            "num_of_item": "integer",
            "item_sizes": "set automatically based on item_subtype",
            "discount": "discount percentage",
            "unavailable_sizes":"specify the sizes that are unavailable",
            "is_hot": "is the item a trend or not",
            "available": "boolean"
        }
        response = jsonify(data)
        return response
    else:
        has_id_field = False
        data = request.get_json() or {}
        for field in ['item_name',"item_category","item_subtype","item_image_link", "item_description","item_price","num_of_item"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
        
        #check the category and subtype
        if not Item.validate_category_subtype(data["item_category"],data["item_subtype"]):
            msg ="Please provide proper item_category: "+str(Item.category)
            msg += "\n"
            msg+= "Please provide proper item_subtype: "+str(Item.subtype)
            return bad_request(msg)
        # if not Item.validate_category(data["item_category"]):
        #     return bad_request("Please provide proper item_category: "+str(Item.category))
        # if not Item.validate_subtype(data["item_subtype"]):
        #     return bad_request("Please provide proper item_subtype: "+str(Item.subtype))
        
        #select correct item_sizes based on the subtype
        data["item_sizes"] = Item.available_size_lists[data["item_subtype"].lower()]
        
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
        # response ="hello reachable"
        return response

from app.menu import bp
from flask import jsonify
from app.models import Item
from flask import request,current_app
from app.errors import bad_request
from app import db
from flask import url_for
from app import cloudinary

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
    # data = request.get_json() or {}
    data = request.form.to_dict() or {}
    # data = request.form.to_dict() or {} 
    if  'id' in data and data['id'] != item.id:
        return bad_request('You can not change id of this item')
    
    if "item_name" in data:
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')

    #these lines under here is no proper to update or add item
    # if "item_category" in data:
    #     for attribute in ["gender","top","bottom"]:
    #         if attribute not in data["item_category"]:
    #             return bad_request(f"please provide {attribute} for item_category")

    if any(i in data for i in ["gender","top","bottom"]) and not all(i in data for i in ["gender","top","bottom"]):
        return bad_request(f"please provide gender,top and bottom for item_category")
    
    #for float attribute
    if "item_price" in data:
        data["item_price"] = float(data["item_price"])
    #for integer attribute    
    for field in ["M_stock","L_stock","XL_stock","XXL_stock","discount"]:
        if field in data:
            data[field]= int(data[field])
    #for boolean value
    for field in ["is_hot","available"]:
        if field in data:
            data[field]= bool(data[field])
    #for field that have a list format
    for attribute in ["colors"]:
        if attribute in data:
            data[attribute]=data[attribute].split(',')
        else:
            data[attribute]=[]
                
    #adding item_image_link
    upload_result = None
    if "item_image_link" in request.files:
        file_to_upload = request.files['item_image_link']
        if file_to_upload:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                current_app.logger.info(upload_result)
                data['item_image_link']=upload_result["secure_url"]
    
    data["item_category"]=dict()
    if "gender" in data:
        for attribute in ["gender","top","bottom"]:
            if data[attribute]:
                item_list= data[attribute].split(',')
                data["item_category"][attribute]=item_list
            else:
                data["item_category"][attribute]=[]
    
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
            "M_stock": "stock of M size",
            "L_stock": "stock of L size",
            "XL_stock": "stock of XL size",
            "XXL_stock": "stock of XXL size",
            "discount": "discount percentage",
            "is_hot": "is the item a trend or not",
            "available": "boolean"
        }
        response = jsonify(data)
        return response
    else:
        has_id_field = False
        # data = request.get_json() or {}
        # return request.form
        data = request.form.to_dict() or {}
        for field in ['item_name',"item_description","item_price","M_stock","L_stock","XL_stock","XXL_stock","colors"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
        
        for attribute in ["gender","top","bottom"]:
            if attribute not in data:
                return bad_request(f"please provide {attribute} for item_category")
        
        #for float attribute
        if "item_price" in data:
            data["item_price"] = float(data["item_price"])
        #for integer attribute    
        for field in ["M_stock","L_stock","XL_stock","XXL_stock","discount"]:
            if field in data:
                data[field]= int(data[field])
        #for boolean value
        for field in ["is_hot","available"]:
            if field in data:
                data[field]= bool(data[field])
        #for field that have a list format
        for attribute in ["colors"]:
            if attribute in data:
                data[attribute]=data[attribute].split(',')
            else:
                data[attribute]=[]
                
        #adding item_image_link
        upload_result = None
        if "item_image_link" in request.files:
            file_to_upload = request.files['item_image_link']
            if file_to_upload:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                current_app.logger.info(upload_result)
                data['item_image_link']=upload_result["secure_url"]
        else:
            return bad_request('Please provide an image for the product')
        
        data["item_category"] = dict()
        for attribute in ["gender","top","bottom"]:
            if data[attribute]:
                item_list= data[attribute].split(',')
                data["item_category"][attribute]=item_list
            else:
                data["item_category"][attribute]=[]
        
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
        for field in ['item_name',"item_category","item_image_link", "item_description","item_price","M_stock","L_stock","XL_stock","XXL_stock","colors"]:
            if field not in data:
                return bad_request('must include '+field+' fields') 
        if Item.query.filter_by(item_name=data['item_name']).first():
            return bad_request('Name duplicate detected! Please use another name!')
            
        #these lines under here is no proper to update or add item
        for attribute in ["gender","top","bottom"]:
            if attribute not in data["item_category"]:
                return bad_request(f"please provide {attribute} for item_category") 
        
        for attribute in ["gender","top","bottom"]:
            if attribute not in data["item_category"]:
                return bad_request(f"please provide {attribute} for item_category")
        
        if 'id' in data:
            has_id_field =True
        item = Item()
        if has_id_field:
            data.pop('id')
        item.from_dict(data)
        db.session.add(item)
    
    db.session.commit()
    return f"just add {len(request.get_json())}"   
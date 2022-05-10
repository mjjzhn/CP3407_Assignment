from dataclasses import dataclass
from datetime import datetime
from email.policy import default
from zoneinfo import available_timezones
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import url_for
import json


class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<Admin {}>'.format(self.username)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    favorite_list = db.Column(db.String(200))

    def __repr__(self):
        return '<Customer {}>'.format(self.username)

    def to_dict(self):
        data= {
            "id": self.id,
            "username": self.username
        }
        return data

    def set_favorite(self,item_id):
        self.favorite_list = self.favorite_list + item_id + ","

    def set_username(self,username):
        self.username = username

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class APIMixin(object):
    @staticmethod
    def to_collection_dict(query, endpoint, **kwargs):
        data ={
            'items': [item.to_dict() for item in query],
            '_meta': {
                'total_items': len(query)
            },
            '_links': {
                'self': url_for(endpoint,**kwargs)
            }
        }
        return data

class Item(APIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(64), index=True, unique=True)
    item_category =db.Column(db.String(32)) #for example, men, women, kid
    item_subtype = db.Column(db.String(16)) #for example, top, bottom, shoes
    item_image_link = db.Column(db.String(140))
    item_description= db.Column(db.String(140))
    item_price = db.Column(db.Float(16))
    discount = db.Column(db.Integer, default=0)
    num_of_item = db.Column(db.Integer)
    item_sizes = db.Column(db.String(64)) #add based on the size_list, json type
    unavailable_sizes=db.Column(db.String(64), default="[]") #in json type
    is_hot = db.Column(db.Boolean, default=False)
    available = db.Column(db.Boolean, default=True)

    # #the list of size for this item in ascending order. Format:"small large big"
    # size_list_dict ={}

    category = ["men", "women", "kid"]
    subtype=["top", "bottom", "shoes"]
    #refers to this link: https://iora.online/sg/size-guide/
    available_size_lists={
        "top" : ["XS","S", "M","L","XL","XXL"],
        "bottom":["XS","S", "M","L","XL","XXL"],
        "shoes":["36","37","38","39","40"]
    }
    
    @staticmethod
    def validate_size(unavailable_sizes, size_list):
        for size in unavailable_sizes:
            if size not in size_list:
                return False
        return True

    # @staticmethod
    # def validate_size_list(size_list):
    #     if size_list not in Item.available_size_lists:
    #         return False
    #     return True

    @staticmethod
    def validate_category_subtype(category,subtype):
        #check whether the category and type is valid or not
        if category not in Item.category:
            return False
        if subtype not in Item.subtype:
            return False
        return True

    def add_item_to_order(self):
        self.num_of_item -= 1

    def __repr__(self):
        return '<Item {}>'.format(self.item_name)

    def to_dict(self):
        size_list = json.loads(self.item_sizes)
        unavailable_size_list =json.loads(self.unavailable_sizes)
        data= {
            "id": self.id,
            "item_name": self.item_name,
            "item_category":self.item_category,
            "item_subtype": self.item_subtype,
            "item_image_link":self.item_image_link,
            "item_description": self.item_description,
            "item_price":self.item_price,
            "discount": self.discount,
            "num_of_item":self.num_of_item,
            #############
            "item_sizes":size_list,
            "unavailable_sizes":unavailable_size_list,
            ###########
            "is_hot": self.is_hot,
            "available":self.available,
            '_links':{
                'self': url_for('menu.get_item', id=self.id)
            }
        }
        return data
    
    def from_dict(self,data):
        for field in ['item_name',"item_category","item_subtype","item_image_link", "item_description","item_price","discount","num_of_item"]:
            if field in data:
                setattr(self, field, data[field])
        
        for field in ["item_sizes", "unavailable_sizes"]:
            if field in data:
                data[field]= json.dumps(data[field])
                setattr(self, field, data[field])

        if "available" in data:
            if isinstance(data["available"], bool):
                setattr(self, "available", data["available"])
        if "is_hot" in data:
            if isinstance(data["is_hot"], bool):
                setattr(self, "is_hot", data["is_hot"])

    def get_price(self):
        price = self.item_price - self.discount
        return price

class Order(APIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer)
    order_status = db.Column(db.String(32))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    order_items = db.relationship('Order_item', backref='order', lazy='dynamic')

    status = ['order received', 'shipping', 'delivered', 'close']

    def __repr__(self):
        return '<Order No. {}>'.format(self.id)

    def add_item(self, item_id, quantity):
        order_item = Order_item(order_id=self.id, item_id=item_id, quantity=quantity)
        db.session.add(order_item)
        db.session.commit()

    def remove_item(self, item_id):
        order_items = Order_item.query.filter_by(order_id=self.id, item_id=item_id).all()
        for order_item in order_items:
            db.session.delete(order_item)
        db.session.commit()

    def remove_all_item(self):
        order_items = Order_item.query.filter_by(order_id=self.id).all()
        for order_item in order_items:
            db.session.delete(order_item)
        db.session.commit()

    def get_items(self):
        items = []
        for order_item in self.order_items:
            items.append(order_item.get_item())
        return items

    def item_id_to_quantity(self):
        item_id_to_quantity = {}
        for order_item in self.order_items:
            item_id_to_quantity[order_item.item_id] = order_item.quantity
        return item_id_to_quantity

    def set_status_order_received(self):
        self.order_status = Order.status[0]

    def set_status_shipping(self):
        self.order_status = Order.status[1]

    def set_status_delivered(self):
        self.order_status = Order.status[3]

    def set_status_close(self):
        self.order_status = Order.status[4]

    def to_dict(self):
        data = {
            "id": self.id,
            "customer_id": self.customer_id,
            "order_status": self.order_status,
            "timestamp": self.timestamp
        }
        items = []
        total = 0
        for order_item in self.order_items:
            item_to_quan = {}
            item_to_quan["item"] = order_item.get_item().to_dict()
            item_to_quan["quantity"] = order_item.quantity
            items.append(item_to_quan)
            total = total + order_item.get_item().get_price() #new defined function in item model

        data["items"] = items
        data["total"] = total
        return data

    def from_dict(self, data, add_item=False):
        for field in ['customer_id', 'order_status']:
            if field in data:
                setattr(self, field, data[field])


class Order_item(db.Model):
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), primary_key=True)
    quantity = db.Column(db.Integer)

    def get_item(self):
        return Item.query.filter_by(id=self.item_id).first()

    def get_order(self):
        return Order.query.filter_by(id=self.order_id).first()

    def __repr__(self):
        return "Order_item object, order_id: {}, item_id: {}".format(self.order_id, self.item_id)
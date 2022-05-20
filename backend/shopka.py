from app import create_app,db
from app.models import Admin, Customer, Item,Order,Order_item
app= create_app()

#create flask shell to test python when developing
@app.shell_context_processor
def make_shell_context():
    return {'db':db, 'Admin':Admin, 'Customer':Customer, "Item":Item,"Order":Order,"Order_item":Order_item}
    
# if __name__ == "__main__":
#     app.run(host="0.0.0.0")
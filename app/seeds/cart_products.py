from app.models import db, Cart, environment, SCHEMA, Product
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cart_products():
    for item in [
        {"cart_id": 1, "item_id": 2},
        {"cart_id": 1, "item_id": 23},
        {"cart_id": 1, "item_id": 28},
        {"cart_id": 1, "item_id": 41},
        {"cart_id": 1, "item_id": 50},
        {"cart_id": 1, "item_id": 51},
        {"cart_id": 1, "item_id": 77},
        {"cart_id": 1, "item_id": 78},
        {"cart_id": 1, "item_id": 191},
        {"cart_id": 1, "item_id": 198},
        {"cart_id": 2, "item_id": 2},
        {"cart_id": 2, "item_id": 369},
        {"cart_id": 2, "item_id": 381},
        {"cart_id": 2, "item_id": 395},
        {"cart_id": 2, "item_id": 361},
        {"cart_id": 2, "item_id": 354},
        {"cart_id": 2, "item_id": 338},
        {"cart_id": 2, "item_id": 312},
        {"cart_id": 2, "item_id": 301},
        {"cart_id": 2, "item_id": 324},
        {"cart_id": 3, "item_id": 10},
        {"cart_id": 3, "item_id": 1},
        {"cart_id": 3, "item_id": 2},
        {"cart_id": 3, "item_id": 3},
        {"cart_id": 3, "item_id": 4},
        {"cart_id": 3, "item_id": 5},
        {"cart_id": 3, "item_id": 6},
        {"cart_id": 3, "item_id": 7},
        {"cart_id": 3, "item_id": 8},
        {"cart_id": 3, "item_id": 9},
    ]:
        cart = Cart.query.get(item["cart_id"])
        product = Product.query.get(item["item_id"])
        cart.products.append(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cart_products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM cart_products"))

    db.session.commit()

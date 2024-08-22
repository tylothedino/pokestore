from app.models import db, List, environment, SCHEMA, Product
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_list():
    demo = List(user_id=1, name="My Go to's")
    marnie = List(user_id=2, name="TM's I really need")
    bobbie = List(user_id=3, name="POKEBALLS FOR ME?")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    for item in [
        {"list_id": 1, "item_id": 2},
        {"list_id": 1, "item_id": 23},
        {"list_id": 1, "item_id": 28},
        {"list_id": 1, "item_id": 41},
        {"list_id": 1, "item_id": 50},
        {"list_id": 1, "item_id": 51},
        {"list_id": 1, "item_id": 77},
        {"list_id": 1, "item_id": 78},
        {"list_id": 1, "item_id": 191},
        {"list_id": 1, "item_id": 198},
        {"list_id": 2, "item_id": 2},
        {"list_id": 2, "item_id": 369},
        {"list_id": 2, "item_id": 381},
        {"list_id": 2, "item_id": 395},
        {"list_id": 2, "item_id": 361},
        {"list_id": 2, "item_id": 354},
        {"list_id": 2, "item_id": 338},
        {"list_id": 2, "item_id": 312},
        {"list_id": 2, "item_id": 301},
        {"list_id": 2, "item_id": 324},
        {"list_id": 3, "item_id": 10},
        {"list_id": 3, "item_id": 1},
        {"list_id": 3, "item_id": 2},
        {"list_id": 3, "item_id": 3},
        {"list_id": 3, "item_id": 4},
        {"list_id": 3, "item_id": 5},
        {"list_id": 3, "item_id": 6},
        {"list_id": 3, "item_id": 7},
        {"list_id": 3, "item_id": 8},
        {"list_id": 3, "item_id": 9},
    ]:
        user_list = List.query.get(item["list_id"])
        product = Product.query.get(item["item_id"])
        user_list.products.append(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()

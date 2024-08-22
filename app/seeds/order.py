from app.models import db, Order, environment, SCHEMA, Product
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random


def generate_random_datetime(start_year, end_year):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)

    # Generate a random number of days between start_date and end_date
    delta_days = (end_date - start_date).days
    random_days = random.randint(0, delta_days)

    # Generate the random datetime
    random_date = start_date + timedelta(days=random_days)

    # Generate random time
    random_time = timedelta(
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
        seconds=random.randint(0, 59),
    )

    return datetime.combine(random_date, datetime.min.time()) + random_time


# Adds a demo user, you can add other users here if you want
def seed_orders():
    demo = Order(
        user_id=1,
        status="Delivered",
        delivery_date=generate_random_datetime(2020, 2024),
        total_cost=200000,
    )
    marnie = Order(
        user_id=2,
        status="Cancelled",
        delivery_date=None,
        total_cost=3000,
    )
    bobbie = Order(
        user_id=3,
        status="Returned",
        delivery_date=None,
        total_cost=200000,
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    for item in [
        {"order_id": 1, "item_id": 210},
        {"order_id": 1, "item_id": 103},
        {"order_id": 1, "item_id": 1},
        {"order_id": 2, "item_id": 2},
        {"order_id": 2, "item_id": 23},
        {"order_id": 2, "item_id": 2},
        {"order_id": 3, "item_id": 22},
        {"order_id": 3, "item_id": 33},
        {"order_id": 3, "item_id": 44},
    ]:
        user_order = Order.query.get(item["order_id"])
        product = Product.query.get(item["item_id"])
        user_order.products.append(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()

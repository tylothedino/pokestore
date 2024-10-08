from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .cart import undo_cart
from .list import seed_list, undo_lists
from .cart_products import seed_cart_products, undo_cart_products
from .order import seed_orders, undo_orders
from .review import seed_review, undo_review
from .review_likes import seed_review_likes, undo_review_likes
from .order_products import undo_order_product

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_products()
        undo_cart()
        undo_lists()
        undo_cart_products()
        undo_orders()
        undo_review()
        undo_review_likes()
        undo_order_product()
    seed_users()
    seed_products()
    seed_list()
    seed_cart_products()
    seed_orders()
    seed_review()
    seed_review_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_products()
    undo_cart()
    undo_lists()
    undo_cart_products()
    undo_orders()
    undo_review()
    undo_review_likes()
    undo_order_product()
    # Add other undo functions here

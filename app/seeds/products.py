from app.models import db, Product, environment, SCHEMA
import requests
from sqlalchemy.sql import text


base_url = "https://pokeapi.co/api/v2/"
item_max = 2180
tm_max = 2102


def get_item_data(i):
    url = f"{base_url}/item/{i}"
    response = requests.get(url)

    if response.status_code == 200:
        pokemon_data = response.json()
        return pokemon_data
    else:
        print(f"Item {i}: Failed to retrieve data {response.status_code}")


def seed_products():
    for i in range(1, 113):

        item = get_item_data(i)

        new_product = Product(
            name=item["names"][7]["name"],
            price=item["cost"],
            category=item["category"]["name"],
            effect=item["effect_entries"][0]["effect"],
            description=item["flavor_text_entries"][5]["text"],
            image=item["sprites"]["default"],
            user_id=1,
        )

        db.session.add(new_product)
    db.session.commit()

    for i in range(114, 125):

        item = get_item_data(i)

        new_product = Product(
            name=item["names"][5]["name"],
            price=item["cost"],
            category=item["category"]["name"],
            effect=item["effect_entries"][0]["effect"],
            description=item["flavor_text_entries"][0]["text"],
            image=item["sprites"]["default"],
            user_id=1,
        )

        db.session.add(new_product)
    db.session.commit()

    for i in range(126, 293):

        item = get_item_data(i)

        new_product = Product(
            name=item["names"][7]["name"],
            price=item["cost"],
            category=item["category"]["name"],
            effect=item["effect_entries"][0]["effect"],
            description=item["flavor_text_entries"][5]["text"],
            image=item["sprites"]["default"],
            user_id=2,
        )

        db.session.add(new_product)
    db.session.commit()

    for i in range(295, 404):

        item = get_item_data(i)

        new_product = Product(
            name=item["names"][7]["name"],
            price=item["cost"],
            category=item["category"]["name"],
            effect=item["effect_entries"][0]["effect"],
            description=item["flavor_text_entries"][5]["text"],
            image=item["sprites"]["default"],
            user_id=3,
        )

        db.session.add(new_product)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()

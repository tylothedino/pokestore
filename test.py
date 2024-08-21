import requests

base_url = "https://pokeapi.co/api/v2/"


# ?limit=2180&offset=0
def get_pokemon_info(name):
    url = f"{base_url}/item/403"
    response = requests.get(url)

    if response.status_code == 200:
        pokemon_data = response.json()
        return pokemon_data
    else:
        print(f"Failed to retrieve data {response.status_code}")


pokemon_name = "pikachu"
pokemon_info = get_pokemon_info(pokemon_name)

if pokemon_info:
    print(pokemon_info["names"][7]["name"])
    print(pokemon_info["cost"])
    print("CATEGORY: ", pokemon_info["category"]["name"])
    print("EFFECT: ", pokemon_info["effect_entries"][0]["effect"])
    print("FLAVOR: ", pokemon_info["flavor_text_entries"][5]["text"])
    print(pokemon_info["sprites"]["default"])


url2 = "https://pokeapi.co/api/v2/machine/1"
url3 = "https://pokeapi.co/api/v2/item-category/standard-balls"


def get_tm():
    response = requests.get(url2)

    if response.status_code == 200:
        tm_data = response.json()
        return tm_data
    else:
        print(f"Failed to retrieve data {response.status_code}")


tm = get_tm()

# if tm:
#     print(tm["item"])

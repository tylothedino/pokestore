# **Pokestore**
### Pokestore is a financial web application inspired from Amazon, that displays over 300 purchasable items using the PokeAPI library. The application allows users to make purchases, create, read, update and delete reviews and lists, and update orders.

# Live Link
https://pokestore-ovzh.onrender.com/


## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Site Snapshots
## **Landing Page**
![alt text](/images/image.png)
## **Product Category Page**
![alt text](/images/image1.png)
## **Product Details Page**
![alt text](/images/image3.png)
## **Cart Details Page**
![alt text](/images/image2.png)
## **Orders Page**
![alt text](/images/image4.png)
## **List Details Page**
![alt text](/images/image5.png)

# Feature List
- Cart
- Product
- List
- Order
- Review


# Endpoints

## Auth Routes

### Current User
##
* Purpose: This fetch is sent upon initial app load and on subsequent refreshes and navigations. It returns an object representing the current user, if user is logged in.
* Method: ```POST```
* URL: ```/api/auth/```
* Successful Response: HTTP Status Code 200
```python
{
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "created_at": DATE,
}
```
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Unauthorized (from @login_required)
##
* Purpose: This endpoint will be routed to in the case that a protected route does not pass validations for the current user.
* Method ```POST```
* URL: ```/api/auth/unauthorized```
* Successful Response: NA
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Sign Up
##
* Purpose: This fetch sends the signup form data to the backend to process the creation of a new user.
* Method: ```POST```
* URL: ```/api/auth/signup```
* Successful Response: HTTP Status 201
```python
{
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "created_at": DATE,
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```
### Login
##
* Purpose: This fetch attempts to login a user with the provided credentials.
* Method: ```POST```
* URL: ```/api/auth/login```
* Successful Response: HTTP Status 200
```python
{
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "created_at": DATE,
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```
### Logout
##
* Purpose: This fetch will logout the current user.
* Method: ```POST```
* URL: ```/api/auth/logout```
* Successful Response: HTTP Status 200
```python
{
   'message': 'User logged Out'
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'No session'
}
```

## Product Routes
### Get Products
* Purpose: This fetch will get all existing products.
* Method: ```GET```
* URL: ```/api/products/```
* Successful Response: HTTP Status 200
```python
{
    [
        {
            "category": STRING,
            "description": STRING,
            "effect": STRING,
            "id": INTEGER,
            "image": STRING,
            "name": STRING,
            "price": INTEGER,
        },
        ...
     ]
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Get One Product by ID
* Purpose: This fetch will get an existing product.
* Method: ```GET```
* URL: ```/api/products/<int:product_id>```
* Successful Response: HTTP Status 200
```python
{

     "category": STRING,
     "description": STRING,
     "effect": STRING,
     "id": INTEGER,
     "image": STRING,
     "name": STRING,
     "price": INTEGER,

}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## Cart Routes

### Get Current User's Cart
* Purpose: This fetch will search for the current user's cart.
* Method: ```GET```
* URL: ```/api/cart```
* Successful Response: HTTP Status 200
```python
{
    "id": INTEGER,
    "updated_at": DATE,
    "products":
    [
        {
            "category": STRING,
            "description": STRING,
            "effect": STRING,
            "id": INTEGER,
            "image": STRING,
            "name": STRING,
            "price": INTEGER,
        },
        ...
     ]


}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Clear Current User's Cart
* Purpose: This fetch will clear all products in the current user's cart.
* Method: ```DELETE```
* URL: ```/api/cart/clear```
* Successful Response: HTTP Status 200
```python
{
    "message": "Cleared your cart"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```
### Remove Product from Current User's Cart
* Purpose: This fetch will remove a product from the current user's cart based on amount.
* Method: ```PUT```
* URL: ```/api/cart/remove/<int:product_id>```
* Body:
```python
{
   'amount': INTEGER
}
```
* Successful Response: HTTP Status 200
```python
{
    "message": f"Removed {amount} {product} to your cart"
    }
```

* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Add Product to Current User's Cart
* Purpose: This fetch will add a product to the current user's cart based on amount.
* Method: ```PUT```
* URL: ```/api/cart/update/<int:product_id>```
* Body:
```python
{
   'amount': INTEGER
}
```
* Successful Response: HTTP Status 200
```python
{
    "message": f"Updated {amount} {product} to your cart"
    }
```

* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Remove all of a Product from Current User's Cart
* Purpose: This fetch will remove all of a product from the current user's cart.
* Method: ```PUT```
* URL: ```/api/cart/remove/<int:product_id>/all```
* Successful Response: HTTP Status 200
```python
{
    "message": f"Removed {product} from your cart"
    }
```

* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```
### Purchase Current User's Cart
* Purpose: This fetch will purchase the contents from the current user's cart.
* Method: ```POST```
* URL: ```/api/cart`/purchase``
* Successful Response: HTTP Status 200
```python
{
    "id": INTEGER,
    "status": STRING,
    "total_cost": INTEGER,
    "delivery_date": DATE,
    "delivery_address": STRING,
    "user_id": INTEGER,
    "created_at": DATE,
    "products":
        [
            {
                "category": STRING,
                "description": STRING,
                "effect": STRING,
                "id": INTEGER,
                "image": STRING,
                "name": STRING,
                "price": INTEGER,
            },
            ...
        ]


}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## List Routes
### Get Lists
* Purpose: This fetch will get all lists of the current user.
* Method: ```GET```
* URL: ```/api/lists/```
* Successful Response: HTTP Status 200
```python
{
    [
        {
            "name": STRING,
            "id": INTEGER,
            "products":
                [
                    {
                        "category": STRING,
                        "description": STRING,
                        "effect": STRING,
                        "id": INTEGER,
                        "image": STRING,
                        "name": STRING,
                        "price": INTEGER,
                    },
                    ...
                ]
            "updated_at": DATE,
        },
        ...
     ]
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```
### Create a list
* Purpose: This fetch will create a list and assign it to the current user
* Method: ```POST```
* URL: ```/api/lists/create```
* Body:
```python
{
   'name': STRING
}
```
* Successful Response: HTTP Status 200
```python
{
    "name": STRING,
    "id": INTEGER,
    "products":
        [
            {
                "category": STRING,
                "description": STRING,
                "effect": STRING,
                "id": INTEGER,
                "image": STRING,
                "name": STRING,
                "price": INTEGER,
            },
            ...
        ]
    "updated_at": DATE,
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```


### Update a list
* Purpose: This fetch will update an existing list of a user
* Method: ```PUT```
* URL: ```/api/lists/edit/<int:id>```
* Body:
```python
{
   'name': STRING
}
```
* Successful Response: HTTP Status 200
```python
{
    "message": "Submitted edit"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```


### Add a product to a list
* Purpose: This fetch will add a product to an existing list of a user
* Method: ```PUT```
* URL: ```/api/lists/add/<int:id>```
* Body:
```python
{
   'product_id': INTEGER
}
```
* Successful Response: HTTP Status 200
```python
{
    "messages": f"Added {product} to {list}"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Remove a product from a list
* Purpose: This fetch will remove a product from an existing list of a user
* Method: ```PUT```
* URL: ```/api/lists/remove-from-list/<int:id>```
* Body:
```python
{
   'product_id': INTEGER
}
```
* Successful Response: HTTP Status 200
```python
{
    "message": f"Removed {product} from {list}"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```



### Remove a list
* Purpose: This fetch will remove an existing list of a user
* Method: ```PUT```
* URL: ```/api/lists/remove/<int:id>```
* Successful Response: HTTP Status 200
```python
{
    "message":  "Successfully deleted the list"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## Order Routes
### Get Orders
* Purpose: This fetch will get all orders of the current user.
* Method: ```GET```
* URL: ```/api/orders/```
* Successful Response: HTTP Status 200
```python
{
    [
        {
            "id": INTEGER,
            "status": STRING,
            "total_cost": INTEGER,
            "delivery_date": DATE,
            "delivery_address": STRING,
            "user_id": INTEGER,
            "created_at": DATE,
            "products":
                [
                    {
                        "category": STRING,
                        "description": STRING,
                        "effect": STRING,
                        "id": INTEGER,
                        "image": STRING,
                        "name": STRING,
                        "price": INTEGER,
                    },
                    ...
                ]
        },
        ...
     ]
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Get Order
* Purpose: This fetch will get a single order of the current user by ID.
* Method: ```GET```
* URL: ```/api/orders/<int:id>```
* Successful Response: HTTP Status 200
```python
{

    {
        "id": INTEGER,
        "status": STRING,
        "total_cost": INTEGER,
        "delivery_date": DATE,
        "delivery_address": STRING,
        "user_id": INTEGER,
        "created_at": DATE,
        "products":
            [
                {
                    "category": STRING,
                    "description": STRING,
                    "effect": STRING,
                    "id": INTEGER,
                    "image": STRING,
                    "name": STRING,
                    "price": INTEGER,
                },
                ...
            ]
    }

}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Update Order Status
* Purpose: This fetch will update a single order of the current user by ID.
* Method: ```PUT```
* URL: ```/api/orders/<int:id>```
* Body:
```python
{
   'status': STRING
}
```
* Successful Response: HTTP Status 200
```python
{

    {
        "id": INTEGER,
        "status": STRING,
        "total_cost": INTEGER,
        "delivery_date": DATE,
        "delivery_address": STRING,
        "user_id": INTEGER,
        "created_at": DATE,
        "products":
            [
                {
                    "category": STRING,
                    "description": STRING,
                    "effect": STRING,
                    "id": INTEGER,
                    "image": STRING,
                    "name": STRING,
                    "price": INTEGER,
                },
                ...
            ]
    }

}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Cancel Order
* Purpose: This fetch will cancel a single order of the current user by ID.
* Method: ```DELETE```
* URL: ```/api/orders/<int:id>/cancel```
* Successful Response: HTTP Status 200
```python
{
    "message":  "Order cancelled"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## Review Routes
### Get Reviews
* Purpose: This fetch will get all reviews by ID.
* Method: ```GET```
* URL: ```/api/reviews/<int:id>```
* Successful Response: HTTP Status 200
```python
{
    "id": INTEGER,
    "name": STRING,
    "description": STRING,
    "updated_at": DATE,
    "product_id": DATE,
    "owner":
        {
            "id": INTEGER,
            "username": STRING,
            "first_name": STRING,
            "last_name": STRING,
        },
    "rating": INTEGER,
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Get Reviews for a Product
* Purpose: This fetch will get all reviews for a single product
* Method: ```GET```
* URL: ```/api/reviews/<int:product_id>```
* Successful Response: HTTP Status 200
```python
{
    [

        {
            "id": INTEGER,
            "status": STRING,
            "total_cost": INTEGER,
            "delivery_date": DATE,
            "delivery_address": STRING,
            "user_id": INTEGER,
            "created_at": DATE,
            "products":
                [
                    {
                        "category": STRING,
                        "description": STRING,
                        "effect": STRING,
                        "id": INTEGER,
                        "image": STRING,
                        "name": STRING,
                        "price": INTEGER,
                    },
                    ...
                ]
        },
        ...
    ]
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Update Review
* Purpose: This fetch will update a review if you are the correct user.
* Method: ```PUT```
* URL: ```/api/reviews/<int:id>/edit```
* Body:
```python
{
   "name": STRING,
   "description": STRING,
   "rating": INTEGER
}
```
* Successful Response: HTTP Status 200
```python
{
    "messagese": "Updated review"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Cancel Order
* Purpose: This fetch will cancel a single order of the current user by ID.
* Method: ```DELETE```
* URL: ```/api/reviews/<int:id>/delete```
* Successful Response: HTTP Status 200
```python
{
    "message":  "Review has been deleted"
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```


# Connect
[LinkedIn](https://www.linkedin.com/in/tylothedino/)

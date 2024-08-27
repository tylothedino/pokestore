
export const productActions = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    let intent = formData.get('intent');

    if (intent === 'create-product') {
        const response = await fetch(`/api/products/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.productName,
                price: data.price,
                category: data.category,
                effect: data.effect,
                description: data.description,
                image: data.image,
            })
        })

        if (response.ok) {
            const message = await response.json();
            return message
        }


    }

    if (intent === 'add-review') {
        const response = await fetch(`/api/products/${data.product_id}/review/add`, {
            method: "POST",
            "Content-Type": "application/json",
            headers: {
            },
            body: JSON.stringify({
                name: data.review_name,
                description: data.description,
                rating: data.rating,
            })
        })

        if (response.ok) {
            const message = await response.json();
            return message;
        }


    }

    if (intent === 'edit-review') {
        const response = await fetch(`/api/reviews/${data.review_id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                rating: data.rating,
            })
        })

        if (response.ok) {
            const message = await response.json();
            return message;
        }


    }

    if (intent === 'delete-review') {
        const response = await fetch(`/api/reviews/${data.review_id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message);
            return message;
        }


    }


    if (intent === 'add-product-to-cart') {
        const response = await fetch(`/api/products/${data.product_id}/add_to_cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: +data.amount
            })
        })

        if (response.ok) {
            const message = await response.json();
            return message
        }

    }

    if (intent === 'add-product-to-list') {
        const response = await fetch(`/api/lists/add/${data.list}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id: data.product_id
            })
        })

        if (response.ok) {
            const listAdd = await response.json();
            // console.log(listAdd)
            return listAdd
        }

    }


    return "FALSE"



};

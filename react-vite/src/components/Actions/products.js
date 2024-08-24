import { redirect } from "react-router-dom";


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
                image: data.image,
                rating: data.rating,
            })
        })

        if (response.ok) {
            const message = await response.json();
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


    return "FALSE"



};

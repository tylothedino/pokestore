import { redirect } from "react-router-dom";

export const orderActions = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    let intent = formData.get('intent');

    if (intent === 'cancel-order') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/orders/${data.order_id}/cancel`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/order/${data.order_index}`)
        }

    }

    if (intent === 'create-review') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/products/${data.product_id}/review/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id: data.product_id,
                user_id: data.user_id,
                description: data.description,
                rating: data.rating,
                name: data.name

            })
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/product/${data.product_id}`)
        }

    }

    return "None"

}

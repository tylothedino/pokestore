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
            return redirect(`/order/${data.order_id}`)
        }

    }

    return "None"

}

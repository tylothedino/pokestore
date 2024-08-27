import { redirect } from "react-router-dom";

export const listActions = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);
    let intent = formData.get('intent');


    if (intent === 'create-list') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/lists/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.list_name
            })
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/list/`)
        }

    }

    if (intent === 'edit-list') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/lists/edit/${data.list_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.list_name
            })
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/list/${data.link}`)
        }

    }

    if (intent === 'delete-list') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/lists/remove/${data.list_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/list`)
        }

    }

    if (intent === 'remove-product') {
        // console.log("I MADE IT HERE - ACTION")
        const response = await fetch(`/api/lists/remove-from-list/${data.list_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id: data.product_id
            })
        })

        if (response.ok) {
            const message = await response.json();
            console.log(message)
            return redirect(`/list/${data.current_index}`)
        }

    }


    return "None"

}

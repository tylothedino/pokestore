
import configureStore from "../../redux/store";
import { thunkAuthenticate } from "../../redux/session";
import { json } from "react-router-dom";

const store = configureStore();


export const allOrderLoader = async () => {
    const response = await fetch('/api/orders/')

    if (response.ok) {
        const orders = await response.json();

        return { orders };
    }

    return { orders: [] }

};

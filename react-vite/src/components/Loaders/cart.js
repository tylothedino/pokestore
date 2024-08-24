
import configureStore from "../../redux/store";
import { thunkAuthenticate } from "../../redux/session";
import { json } from "react-router-dom";

const store = configureStore();


export const cartLoader = async () => {
    const response = await fetch('/api/cart/')

    if (response.ok) {
        const cart = await response.json();

        return { cart };
    }

    return { cart: [] }

};

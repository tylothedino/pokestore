
import configureStore from "../../redux/store";
import { thunkAuthenticate } from "../../redux/session";
import { json } from "react-router-dom";

const store = configureStore();


export const allProductsLoader = async () => {
    const response = await fetch('/api/products/')

    if (response.ok) {
        const products = await response.json();

        return { products };
    }

    return { products: [] }

};


// import configureStore from "../../redux/store";
// import { thunkAuthenticate } from "../../redux/session";
// import { json } from "react-router-dom";

// const store = configureStore();


export const allListLoader = async () => {
    const response = await fetch('/api/lists/')

    if (response.ok) {
        const lists = await response.json();

        return { lists };
    }

    return { lists: [] }

};

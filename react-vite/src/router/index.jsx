import { createBrowserRouter } from 'react-router-dom';

import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SingleProduct from '../components/Product/SingleProduct';
import Cart from '../components/Cart/cart';


import { allProductsLoader } from '../components/Loaders/product';
import { cartLoader } from '../components/Loaders/cart';


import { productActions } from '../components/Actions/products';
import { cartActions } from '../components/Actions/cart';

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/product/:product_num",
        element: <SingleProduct />,
        loader: allProductsLoader,
        action: productActions
      },
      {
        path: "/cart",
        element: <Cart />,
        action: cartActions,
        loader: cartLoader
      }
    ],
  },
]);

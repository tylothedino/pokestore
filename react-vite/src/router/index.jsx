import { createBrowserRouter } from 'react-router-dom';

import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SingleProduct from '../components/Product/SingleProduct';
import Cart from '../components/Cart/cart';


import { allProductsLoader, allProductsLoaderReviewless, categoryProductLoader } from '../components/Loaders/product';
import { cartLoader } from '../components/Loaders/cart';
import { allOrderLoader } from '../components/Loaders/order';


import { productActions } from '../components/Actions/products';
import { cartActions } from '../components/Actions/cart';

import Layout from './Layout';
import SingleOrder from '../components/Order/single_order';
import Orders from '../components/Order/order';
import { orderActions } from '../components/Actions/order';
import CategoryProduct from '../components/Product/CategoryProduct';
import List from '../components/List/List';
import { allListLoader } from '../components/Loaders/list';
import SingleList from '../components/List/SingleList';
import { listActions } from '../components/Actions/list';
import HomePage from '../components/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignupFormPage />,
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: allProductsLoaderReviewless
      },

      {
        path: "/product/category/:category",
        element: <CategoryProduct />,
        loader: categoryProductLoader,
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
      },
      {
        path: "/order/:id",
        element: <SingleOrder />,
        loader: allOrderLoader,
        action: orderActions

      },
      {
        path: "/order",
        element: <Orders />,
        loader: allOrderLoader,
        action: orderActions
      },
      {
        path: "/list",
        element: <List />,
        loader: allListLoader,
        action: listActions
      },
      {
        path: "/list/:id",
        element: <SingleList />,
        loader: allListLoader,
        action: listActions
      },
      {
        path: "*",
        element: (
          <div>
            <h1>404 Page not found</h1>
            <p>
              Not all those who wander are lost, but it seems you may have taken
              a wrong turn.
            </p>
          </div>
        ),
      },
    ],
  },
]);

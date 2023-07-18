import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import ErrorPage from "./error-page";
import { ProductScreen } from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store';
import { CartScreen } from './screens/CartScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ProfileScreen } from './screens/ProfileScreen';
import { OrderListScreen } from './screens/admin/OrderListScreen';
import { ProductListScreen } from './screens/admin/ProductListScreen';
import { ProductEditScreen } from './screens/admin/ProductEditScreen';
import { UserListScreen } from './screens/admin/UserListScreen';
import { UserEditScreen } from './screens/admin/UserEditScreen';
import { HomePage } from './screens/HomePage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/shipping",
        element: <ShippingScreen />,
      },
      {
        path: "/payment",
        element: <PaymentScreen />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrderScreen />,
      },
      {
        path: "/order/:id",
        element: <OrderScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/admin/orderlist",
        element: <OrderListScreen />,
      },
      {
        path: "/admin/productlist",
        element: <ProductListScreen />,
      },
      {
        path: "/admin/productlist/:pageNumber",
        element: <ProductListScreen />,
      },
      {
        path: "/admin/product/:id/edit",
        element: <ProductEditScreen />,
      },
      {
        path: "admin/userlist",
        element: <UserListScreen />,
      },
      {
        path: "/admin/user/:id/edit",
        element: <UserEditScreen />,
      },
      {
        path: "/page/:pageNumber",
        element: <HomePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


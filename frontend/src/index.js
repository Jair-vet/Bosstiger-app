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
import { OrderListScreen } from './screens/OrderListScreen';


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


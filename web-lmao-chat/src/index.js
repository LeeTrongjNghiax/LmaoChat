import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import './index.css';

import SocketContext from "./contexts/SocketContext";
import ThemeProvider from "./contexts/ThemeProvider";
import GlobalVariables from "./GlobalVariables";

import PhoneNumberInputToForgotPasswordPage from './pages/PhoneNumberInputToForgotPasswordPage';
import PhoneNumberInputToSignInPage from './pages/PhoneNumberInputToSignInPage';
import SignInPage from './pages/SignInPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<SignInPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/PhoneNumberInputToSignInPage",
    element: (<PhoneNumberInputToSignInPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/PhoneNumberInputToForgotPasswordPage",
    element: (<PhoneNumberInputToForgotPasswordPage />),
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SocketContext.Provider value={GlobalVariables.socket}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

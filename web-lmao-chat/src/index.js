import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';

import SocketContext from "./contexts/SocketContext";
import ThemeProvider from "./contexts/ThemeProvider";
import GlobalVariables from "./GlobalVariables";

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ErrorPage from './pages/ErrorPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OTPVerifyPage from './pages/OTPVerifyPage';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<SignInPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/SignUpPage",
    element: (<SignUpPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/OTPVerifyPage",
    element: (<OTPVerifyPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/ResetPasswordPage",
    element: (<ResetPasswordPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/MainPage",
    element: (<MainPage />),
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

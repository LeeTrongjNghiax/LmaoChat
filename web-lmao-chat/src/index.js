import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import ThemeProvider from "./contexts/ThemeProvider";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import OTPVerifyPage from "./pages/OTPVerifyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: `/`,
    element: (<SignInPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: `/SignUpPage`,
    element: (<SignUpPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: `/OTPVerifyPage`,
    element: (<OTPVerifyPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: `/ResetPasswordPage`,
    element: (<ResetPasswordPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: `/MainPage`,
    element: (<MainPage />),
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById(`root`));
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      {/* <SocketContext.Provider value={GlobalVariables.socket}> */}
        <RouterProvider router={router} />
      {/* </SocketContext.Provider> */}
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

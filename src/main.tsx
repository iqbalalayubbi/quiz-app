import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/style.css";
import Login from "./pages/Login/Login";
import { AppRoute } from "./libs/enums/enum";

const router = createBrowserRouter([
  {
    path: AppRoute.LOGIN,
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

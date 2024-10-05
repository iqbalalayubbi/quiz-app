import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/style.css";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { AppRoute } from "./libs/enums/enums";

const router = createBrowserRouter([
  {
    path: AppRoute.LOGIN,
    element: <Login />,
  },
  {
    path: AppRoute.ROOT,
    element: (
      <ProtectedRoute
        component={<h1>this is root element</h1>}
        redirectTo={AppRoute.LOGIN}
      />
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

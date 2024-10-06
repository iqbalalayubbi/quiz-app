import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/style.css";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { AppRoute } from "./libs/enums/enums";
import { Login } from "~/pages/Login/Login";
import { Root } from "~/pages/Root/Root";
import { Quiz } from "./pages/Quiz/Quiz";
import { QuizProvider } from "./libs/context/providers";

const router = createBrowserRouter([
  {
    path: AppRoute.LOGIN,
    element: <Login />,
  },
  {
    path: AppRoute.ROOT,
    element: (
      <ProtectedRoute component={<Root />} redirectTo={AppRoute.LOGIN} />
    ),
  },
  {
    path: AppRoute.QUIZ,
    element: (
      <ProtectedRoute
        component={
          <QuizProvider>
            <Quiz />
          </QuizProvider>
        }
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

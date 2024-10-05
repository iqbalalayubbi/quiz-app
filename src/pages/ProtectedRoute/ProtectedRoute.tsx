import { AppRoute } from "~/libs/enums/enums";
import { Navigate } from "~/libs/components/components";
import { TokenStorage } from "~/libs/storage/storage";

type Properties = {
  component: React.ReactNode;
  redirectTo: typeof AppRoute | string;
};

const ProtectedRoute: React.FC<Properties> = ({
  component,
  redirectTo,
}: Properties) => {
  const isLogin = TokenStorage.isValidToken();
  if (!isLogin) {
    return <Navigate replace to={redirectTo as string} />;
  }
  return component;
};

export { ProtectedRoute };

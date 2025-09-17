import { enableMocking } from "@/shared/api/mocks";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet, redirect } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSession();

  return session ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}

export async function protectedLoader() {
  await enableMocking();
  const token = await useSession.getState().refreshToken();
  return token ? null : redirect(ROUTES.LOGIN);
}

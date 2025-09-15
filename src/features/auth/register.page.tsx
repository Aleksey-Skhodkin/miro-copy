import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";
import AuthLayout from "./ui/auth-layout";
import RegisterForm from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в системе"
      footerText={
        <>
          Уже есть аккаунт?{" "}
          <Button asChild variant="link">
            <Link to={ROUTES.LOGIN}>Войти</Link>
          </Button>
        </>
      }
      form={<RegisterForm />}
    />
  );
}

export const Component = RegisterPage;

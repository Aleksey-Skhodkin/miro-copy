import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";
import AuthLayout from "./ui/auth-layout";
import LoginForm from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <>
          Нет аккаунта?{" "}
          <Button asChild variant="link">
            <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
          </Button>
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;

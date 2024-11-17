"use client";

import LoginForm from "@/components/login/login-form";
import RegisterForm from "@/components/login/register-form";
import { Container } from "@/components/ui/container";
import { useState } from "react";

type SwitchLogin = "login" | "register";
export default function LoginPage() {
  const [currentForm, setCurrentForm] = useState<SwitchLogin>("login");
  return (
    <main className="w-full min-w-full bg-gradient-to-br from-secondary to-primary-foreground h-full min-h-screen flex items-center justify-center">
      <Container className="bg-primary w-1/2 shadow-lg shadow-primary/40">
        <span className="text-center text-2xl text-secondary tracking-[0.12rem] leading-5">
          Month Planner <br />
          <span className="text-secondary-foreground text-lg">
            Seu planejador mensal
          </span>
        </span>

        {currentForm === "register" ? (
          <>
            <RegisterForm />
            <span className="text-center">
              Já tem uma conta?{" "}
              <span
                onClick={() => setCurrentForm("register")}
                className="underline text-primary-foreground cursor-pointer"
              >
                login
              </span>
            </span>
          </>
        ) : (
          <>
            <LoginForm />
            <span className="text-center">
              Não tem uma conta?{" "}
              <span
                onClick={() => setCurrentForm("register")}
                className="underline text-primary-foreground cursor-pointer"
              >
                registrar-se
              </span>
            </span>
          </>
        )}
      </Container>
    </main>
  );
}

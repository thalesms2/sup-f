"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ValidateExibition from "@/components/validate-exibition";

export default function Nav({
  logoutAction,
  validateSession,
}: {
  logoutAction: () => void;
  validateSession: () => Promise<boolean>;
}) {
  const pathname = usePathname();
  const [hasSession, setHasSession] = useState(false);

  const changeColor = (route: string) => {
    if (route == pathname) {
      return "transition-colors hover:text-foreground/80 text-foreground";
    }
    return "transition-colors hover:text-foreground/80 text-foreground/60";
  };

  useEffect(() => {
    validateSession().then((session) => {
      setHasSession(session);
    });
  });

  const handleLogout = () => {
    logoutAction();
  };
  return (
    <div className="container flex h-[5%] max-w-screen-2xl">
      <nav className="flex flex-row items-center justify-between w-screen mx-10">
        <div className="flex items-center gap-4 text-sm lg:gap-6">
          <ValidateExibition show={!hasSession}>
            <Link href="/" id="home" className={changeColor("/")}>
              Home
            </Link>
          </ValidateExibition>
          <ValidateExibition show={hasSession}>
            <Link href="/dashboard" id="dashboard" className={changeColor("/dashboard")}>
              Dashboard
            </Link>
            <Link href="/ticket" id="ticket" className={changeColor("/ticket")}>
              Ticket
            </Link>
            <Link href="/user" id="user" className={changeColor("/user")}>
              Usuário
            </Link>
            <Link href="/company" id="company" className={changeColor("/company")}>
              Empresa
            </Link>
          </ValidateExibition>
        </div>
        <div className="flex items-center gap-4 text-sm lg:gap-6">
          <ValidateExibition show={hasSession}>
            <Link href="/settings" id="settings" className={changeColor("/settings")}>
              Configurações
            </Link>
            <Link href="/login" id="logout" onClick={handleLogout} className={changeColor("/login")}>
              Sair
            </Link>
          </ValidateExibition>
          <ValidateExibition show={!hasSession}>
            <Link href="/signup" id="signup" className={changeColor("/signup")}>
              Cadastrar
            </Link>
            <Link href="/login" id="login" className={changeColor("/login")}>
              Login
            </Link>
          </ValidateExibition>
        </div>
      </nav>
    </div>
  );
}

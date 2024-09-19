'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { deleteCookie, hasCookie } from 'cookies-next'

export default function Nav() {
    const pathname = usePathname()
    const token = hasCookie('token')

    // TODO fix token, when refresh the page gives an error
    
    function logout() {
        deleteCookie('token')
        deleteCookie('user')
    }
    const changeColor = (route: string) => {
        if(route == pathname) {
            return "transition-colors hover:text-foreground/80 text-foreground"
        }
        return "transition-colors hover:text-foreground/80 text-foreground/60"
    }

    function isLogged() {
        if(token) {
            return(
                <nav className="flex flex-row items-center justify-between w-screen mx-10">
                    <div className="flex items-center gap-4 text-sm lg:gap-6">
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
                    </div>
                    <div className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link href="/profile" id="signup" className={changeColor("/signup")}>
                            Perfil
                        </Link>
                        <Link href="/login" id="login" onClick={logout} className={changeColor("/login")}>
                            Sair
                        </Link>
                    </div>
                </nav>
            )
        } else {
            return(
                <nav className="flex flex-row items-center justify-between w-screen mx-10">
                    <div className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link href="/" id="home" className={changeColor("/")}>
                            Home
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link href="/signup" id="signup" className={changeColor("/signup")}>
                            Cadastrar
                        </Link>
                        <Link href="/login" id="login" className={changeColor("/login")}>
                            Login
                        </Link>
                    </div>
                </nav>
            )
        }
    }

    return (
        <div className="container flex h-[7%] max-w-screen-2xl">
            {isLogged()}
        </div>
    )
}
'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"

export default function Nav() {
    const pathname = usePathname()
    const changeColor = (route: string) => {
        if(route == pathname) {
            return "transition-colors hover:text-foreground/80 text-foreground"
        }
        return "transition-colors hover:text-foreground/80 text-foreground/60"
    }
    return (
        <div className="container flex h-[7%] max-w-screen-2xl">
            <nav className="flex flex-row items-center justify-between w-screen mx-10">
                <div className="flex items-center gap-4 text-sm lg:gap-6">
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
                    <Link href="/signup" id="signup" className={changeColor("/signup")}>
                        Cadastrar
                    </Link>
                    <Link href="/login" id="login" className={changeColor("/login")}>
                        Login
                    </Link>
                </div>
            </nav>
        </div>
    )
}
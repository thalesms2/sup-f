import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/ticket', '/ticket/create', '/user', '/company', '/profile', '/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    // 3. Decrypt the session from the cookie
    let token = cookies().get('token')?.value
    if(token != '') {
        const response = await fetch('http://localhost:3030/auth/validate-token', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
            cache: 'force-cache',
            next: {
                revalidate: 90000
            }
        })
        const data:{token: boolean} = await response.json()
        if(!data) {
            token = ''
        }
    }
    if (isProtectedRoute && token == '') {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
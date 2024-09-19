'use server'

import { cookies } from 'next/headers'

const cookieStore = cookies()

export async function saveCookie(key: string, value: string) {
    cookieStore.set(key, value)
}

export async function getCookie (key: string) {
    const cookie = await cookieStore.get(key)
    return cookie?.value
}
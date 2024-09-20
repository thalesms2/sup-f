"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import navigate from '@/hooks/navigate'
import { setCookie } from 'cookies-next'

const formSchema = z.object({
    username: z.string().min(5, { message: 'O usuário deve possuir mais de 5 caracteres' }).max(100, { message: 'O usuário não pode conter mais de 100 caracteres' }),
    password: z.string().min(1, { message: 'A senha deve possuir mais de 1 caractere'}).max(1000, { message: 'A senha não pode conter mais de 1000 carecteres' }),
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        let response = await fetch(`http://localhost:3030/auth/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        let data: { token: string, id: number } = await response.json()
        setCookie('token', data.token)
        setCookie('user', data.id.toString())
        navigate('/ticket')
    }
    
    return (
        <div className="flex justify-center items-center h-full">
            <Card className="m-3 w-[400px]">
                <CardHeader className="pb-3 text-center">
                    <CardTitle>Acesse</CardTitle>
                    <CardDescription>Insira suas informações para acessar sua conta</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <CardContent className="flex flex-col gap-y-2 pb-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Usuário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit">Entrar</Button>   
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
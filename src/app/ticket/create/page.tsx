"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


const formSchema = z.object({
    title: z.string().min(5, { message: 'O título deve possuir mais de 5 caracteres' }).max(100, { message: 'O título não pode conter mais de 100 caracteres' }),
    description: z.string().min(1, { message: 'A descrição deve possuir mais de 1 caractere'}).max(1000, { message: 'A descrição não pode conter mais de 1000 carecteres' }),
})

export default function TicketCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        console.log(values)
    }
    return(
        <div>
            <Card className="m-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        <CardHeader className="pb-3">
                            <CardTitle>Ticket - 1</CardTitle>
                            <CardDescription>Novo Ticket</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-2 pb-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Título" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Descrição" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit">Salvar</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
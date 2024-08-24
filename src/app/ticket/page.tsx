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

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


const formSchema = z.object({
    username: z.string().min(2).max(50),
})

export default function Ticket() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return(
        <div>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardHeader>
                            <CardTitle>Ticket - 1</CardTitle>
                            <CardDescription>Novo Ticket</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Submit</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
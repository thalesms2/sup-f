"use client"

import * as React from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
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
import { cn } from "@/lib/utils"
import { navigate } from './actions'

const formSchema = z.object({
    username: z.string().min(5, { message: 'O usuário deve possuir mais de 5 caracteres' }).max(100, { message: 'O usuário não pode conter mais de 100 caracteres' }),
    password: z.string().min(1, { message: 'A senha deve possuir mais de 1 caractere'}).max(1000, { message: 'A senha não pode conter mais de 1000 carecteres' }),
    companyId: z.string()
})

export default function SignUp() {
    const [openCompany, setOpenCompany] = React.useState(false)
    const [companys, setCompanys] = React.useState<Array<{id: number, name: string}>>([])

    React.useEffect(() => {
        async function fetchCompanys() {
            let res = await fetch('http://localhost:3030/company/list')
            let data = await res.json()
            setCompanys(data)
        }
        fetchCompanys()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            companyId: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let response = await fetch(`http://localhost:3030/auth/sign-up`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                companyId: Number(values.companyId),
                isActive: true
            })
        })
        let data:{ id: number, isActive: boolean } = await response.json()
        navigate()
    }
    if (companys.length < 1) return <div>Loading...</div>
    return (
        <div className="flex justify-center items-center h-full">
            <Card className="m-3 w-[400px]">
                <CardHeader className="pb-3 text-center">
                    <CardTitle>Cadastre-se</CardTitle>
                    <CardDescription>Insira suas informações para criar uma conta</CardDescription>
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
                            <FormField
                                control={form.control}
                                name="companyId"
                                render={({ field }) => (
                                    <FormItem>
                                        <Popover open={openCompany} onOpenChange={setOpenCompany}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[350px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? companys.find((company) => company.id.toString() === field.value)?.name
                                                            : "Selecione a empresa"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[350px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search company..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhuma empresa encontrada</CommandEmpty>
                                                        <CommandGroup>
                                                            {companys.map((item) => (
                                                                <CommandItem
                                                                    key={item.id}
                                                                    value={item.name}
                                                                    onSelect={(currentValue) => {
                                                                        form.setValue("companyId", item.id.toString())
                                                                        setOpenCompany(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === item.id.toString() ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {item.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit">Cadastrar</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
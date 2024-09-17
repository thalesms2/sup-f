"use client"

import * as React from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { getCookie } from 'cookies-next'

const formSchema = z.object({
    title: z.string().min(5, { message: 'O título deve possuir mais de 5 caracteres' }).max(100, { message: 'O título não pode conter mais de 100 caracteres' }),
    description: z.string().min(1, { message: 'A descrição deve possuir mais de 1 caractere'}).max(1000, { message: 'A descrição não pode conter mais de 1000 carecteres' }),
    companyId: z.string(),
    public: z.string(),
    status: z.string(),
    actions: z.array(z.object({
        description: z.string(),
        clientUserId: z.string(),
    })),
})

const frameworks = [
    {
        value: "0",
        label: "Next.js",
    },
    {
        value: "1",
        label: "SvelteKit",
    },
    {
        value: "2",
        label: "Nuxt.js",
    },
    {
        value: "3",
        label: "Remix",
    },
    {
        value: "4",
        label: "Astro",
    },
]

export default function TicketCreate() {
    const [openUser, setOpenUser] = React.useState(false)
    const [openCompany, setOpenCompany] = React.useState(false)
    const [numActions, setNumActions] = React.useState(1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyId: "",
            title: "",
            description: "",
            public: "true",
            status: "",
            actions: []
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const token = getCookie('token')
        let response = await fetch(`http://localhost:3030/ticket`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                companyId: values.companyId,
                title: values.title,
                description: values.description
            })
        })
        let data:{token: string} = await response.json()
        console.log(values)
        return data
    }

    function showActions() {
        let actions: Array<{ description: string, clientUserId: string }> = form.getValues('actions')
        actions = actions.filter((action) => action.description)
        return(
            <div className="space-y-3">
                {actions.map((action, index) => {
                    return(
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>Ação {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {action.description}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )
    }

    async function addAction() {
        setNumActions(numActions + 1)
        form.setValue(`actions.${numActions-1}.description`, form.getValues(`actions.${numActions}.description`))
        form.setValue(`actions.${numActions-1}.clientUserId`, form.getValues(`actions.${numActions}.clientUserId`))
        form.setValue(`actions.${numActions}.description`, '')
    }

    return(
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col px-28 space-y-3">
                        <div className="flex flex-row justify-between">
                            <FormField
                                control={form.control}
                                name="public"
                                render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-[150px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="true">Publico</SelectItem>
                                            <SelectItem value="false">Interno</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                                            "w-[300px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? frameworks.find((framework) => framework.value === field.value)?.label
                                                            : "Selecione a empresa"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhuma empresa encontrada</CommandEmpty>
                                                        <CommandGroup>
                                                            {frameworks.map((item) => (
                                                                <CommandItem
                                                                    key={item.value}
                                                                    value={item.value}
                                                                    onSelect={(currentValue) => {
                                                                        form.setValue("companyId", item.value)
                                                                        setOpenCompany(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value === item.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {item.label}
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
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[250px]">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
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
                                    <Textarea placeholder="Descrição do ticket" className="min-h-[150px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Separator />
                        <FormField
                            control={form.control}
                            name={`actions.${numActions}.clientUserId`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Popover open={openUser} onOpenChange={setOpenUser}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[300px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? frameworks.find((framework) => framework.value === field.value)?.label
                                                        : "Selecione o usuário"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhuma empresa encontrada</CommandEmpty>
                                                        <CommandGroup>
                                                            {frameworks.map((item) => (
                                                                <CommandItem
                                                                    key={item.value}
                                                                    value={item.value}
                                                                    onSelect={(currentValue) => {
                                                                        form.setValue(`actions.${numActions}.clientUserId`, item.value)
                                                                        setOpenUser(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value === item.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {item.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`actions.${numActions}.description`}
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Descrição da ação" className="min-h-[150px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="self-end">
                            <Button type="button" onClick={addAction}>Adicionar ação</Button>
                        </div>
                        <Separator />
                        <div className="self-end">
                            <Button type="submit">Salvar ticket</Button>
                        </div>
                        <Separator />
                        {showActions()}
                    </div>
                </form>
            </Form>
        </div>
    )
}
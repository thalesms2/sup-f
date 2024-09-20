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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { getCookie } from 'cookies-next'
import { withMask } from 'use-mask-input';

const formSchema = z.object({
	doc: z.string(),
	name: z.string(),
	email: z.string(),
	contact: z.string(),
	isActive: z.string(),
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

export default function CreateCompany() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			doc: "",
			name: "",
			email: "",
			contact: "",
			isActive: "true",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const token = getCookie('token')
		let response = await fetch(`http://localhost:3030/company`, {
			method: "POST",
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				doc: values.doc,
				name: values.name,
				email: values.email,
				contact: values.contact,
				isActive: values.isActive
			})
		})
		let data = await response.json()
		return data
	}

	return (
		<div className="container h-full flex-1 flex-col space-y-3 md:flex px-24">
			<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Nova empresa</h2>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="container grid grid-cols-12 gap-2">
						<FormField
							control={form.control}
							name="doc"
							render={({ field }) => (
								<FormItem className="col-span-3">
									<FormControl ref={withMask("99.999.999/0001-99")}>
										<Input placeholder="CNPJ" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-9">
									<FormControl  >
										<Input placeholder="Razão social" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="col-span-6">
									<FormControl>
										<Input placeholder="E-mail" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contact"
							render={({ field }) => (
								<FormItem className="col-span-6">
									<FormControl ref={withMask("(99) 9999-9999")}>
										<Input placeholder="Contato" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="col-start-12 col-span-1" type="submit">Salvar</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
import { z } from "zod";

export const ticketFormSchema = z.object({
	title: z
		.string()
		.min(5, { message: "O título deve possuir mais de 5 caracteres" })
		.max(100, {
			message: "O título não pode conter mais de 100 caracteres",
		}),
	description: z
		.string()
		.min(1, { message: "A descrição deve possuir mais de 1 caractere" })
		.max(1000, {
			message: "A descrição não pode conter mais de 1000 carecteres",
		}),
	companyId: z.string(),
	public: z.string(),
	status: z.string(),
	priority: z.string(),
	actions: z.array(
		z.object({
			description: z.string(),
			clientUserId: z.string(),
		})
	),
});
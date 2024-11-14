import type { ITicket, ITicketDTO } from "@/types/ticket.type";
import { cookies } from "next/headers";
import { toast } from "sonner";

const API_URL = `${process.env.API_URL}/ticket`;

const createTicket = async (data: ITicketDTO): Promise<ITicket> => {
  "use server";
  try {
    const token = (await cookies()).get("token")?.value;
    const user = (await cookies()).get("user")?.value;
    data.actions = data.actions.filter(
      (action) => action.description != ""
    );
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyId: Number(data.companyId),
        title: data.title,
        description: data.description,
        public: data.public === "true",
        status: data.status,
        priority: Number(data.priority),
        actions: data.actions,
        userCreatorId: Number(user)
      }),
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const result = await response.json();
    toast(`Ticket ${result.id} criado com sucesso!`);
    return result;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export { createTicket };

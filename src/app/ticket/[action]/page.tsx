"use server";

import { ITicketDTO } from "@/types/ticket.type";
import TicketForm from "./ticketForm";
import { createTicket } from "@/lib/ticketService";

export default function TicketCreate() {
  async function onSubmit(data: ITicketDTO) {
    "use server";
    const response = await createTicket(data);

    console.log(response);
  }

  return <TicketForm ticketAction={onSubmit} />;
}

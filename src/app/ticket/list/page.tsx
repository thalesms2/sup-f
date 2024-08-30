import { Ticket, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Ticket[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            title: "teste",
            public: true
        },
        {
            id: 2,
            title: "teste 2",
            public: true
        },
        {
            id: 3,
            title: "teste 3",
            public: true
        },
    ]
}

export default async function TicketList() {
    const data = await getData()

    return (
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
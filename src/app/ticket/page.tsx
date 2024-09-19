import { columns } from "@/components/ticket/columns"
import { DataTable } from "@/components/ticket/data-table"
import { cookies } from 'next/headers'

const dataTicket = [
    {
        id: 0,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        title: "ticket 1",
        description: "descricao",
        actions: [
            {
                id: 0,
                description: "action 1"
            }
        ],
        userCreatorId: 3,
        companyId: 1,
        status: "done",
        priority: 0,
        public: true
    },
    {
        id: 1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        title: "ticket 2",
        description: "descricao 1",
        actions: [            
            {
                id: 0,
                description: "action 1"
            }
        ],
        userCreatorId: 3,
        companyId: 1,
        status: "progress",
        priority: 2,
        public: true
    }
]

export default async function Ticket() {
    const cookieStore = cookies()
    const token = cookieStore.get('token') || {value: ''}
    let result = await fetch(`http://localhost:3030/ticket/list-all`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
    })
    let data = await result.json()

    return (
        <>
            <div className="container h-full flex-1 flex-col space-y-3 md:flex">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
                    </div>
                </div>
                <DataTable data={dataTicket} columns={columns} />
            </div>
        </>
    )
}
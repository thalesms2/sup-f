import { ITicket, columns } from "./columns"
import { DataTable } from "./data-table"
import { cookies } from 'next/headers'

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
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/ui/button'

export type ITicket = {
    id: number
    title: string
    public: boolean
}

export const columns: ColumnDef<ITicket>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ticket
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium">{`#${row.getValue("id")}`}</div>
        },
    },
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "public",
        header: "Publico",
    },
]

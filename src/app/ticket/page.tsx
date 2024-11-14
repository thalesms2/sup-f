import { columns } from "@/components/ticket/columns";
import { DataTable } from "@/components/ticket/data-table";
import { cookies } from "next/headers";

export default async function Ticket() {
  const cookieStore = cookies();
  const token = cookieStore.get("token") || { value: "" };
  let result = await fetch(`http://localhost:3030/ticket/list-all`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  let data = await result.json();

  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-3 md:flex">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}

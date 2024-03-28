import { type Invoice, columns } from "@/components/invoices/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { databases, Query } from "@/appwrite";

async function getData(): Promise<Invoice[]> {
  const invoices = databases.listDocuments('default', 'invoices');
  console.log((await invoices).documents);
  return (await invoices).documents.map((invoice) => ({
    id: invoice["$id"],
    subject: invoice["subject"],
    client: invoice["client"],
    status: invoice["status"],
    amount: invoice["total"],
    dueDate: new Date(invoice["dueDate"]),
  }));
}

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const query = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getData(),
    retry: 0,
  });

  return (
    <div className="p-10 w-full flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl">Invoices</h2>
        <div className="flex flex-row gap-2">
          <Button variant="outline" size="icon" className="bg-gray-50">
            <Search className="h-4 w-4" />
          </Button>
          <Button>Create invoice</Button>
        </div>
      </div>
      <div className="border rounded-lg">
        <DataTable columns={columns} data={query.data ?? []} />
      </div>
    </div>
  );
}

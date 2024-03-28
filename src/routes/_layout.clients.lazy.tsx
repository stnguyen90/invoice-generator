import { type Client, columns } from "@/components/clients/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { databases } from "@/appwrite";

async function getData(): Promise<Client[]> {
  const clients = await databases.listDocuments("default", "clients");
  return clients.documents.map((client) => ({
    name: client.name,
    company: client.company,
    address: client.address1,
    city: client.city,
    zipcode: client.zip,
    state: client.state,
  }));
}

export const Route = createLazyFileRoute("/_layout/clients")({
  component: Clients,
});

function Clients() {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: () => getData(),
    retry: 0,
  });

  return (
    <div className="p-10 w-full flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl">Clients</h2>
        <div className="flex flex-row gap-2">
          <Button variant="outline" size="icon" className="bg-gray-50">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/invoices/new">
            <Button>Add Client</Button>
          </Link>
        </div>
      </div>
      <div className="border rounded-lg">
        <DataTable columns={columns} data={query.data ?? []} />
      </div>
    </div>
  );
}

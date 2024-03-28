import type { ColumnDef } from "@tanstack/react-table";
  
  export type Client = {
    name: string,
    company: string,
    address: string,
    city: string,
    zipcode: string,
    state: string;
  };
  
  export const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "zipcode",
      header: "Zipcode",
    },
    {
      accessorKey: "state",
      header: "State",
    },
  ];
  
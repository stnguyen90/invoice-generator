import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/invoices/new")({
  component: New,
});

function New() {
  return (
    <div className="p-10 w-full flex flex-col gap-6">
      <h2 className="text-3xl">New invoice</h2>
    </div>
  );
}

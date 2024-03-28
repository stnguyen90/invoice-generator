import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/clients")({
  component: Clients,
});

function Clients() {
  return (
    <div className="p-2">
      <h2>Clients</h2>
    </div>
  );
}

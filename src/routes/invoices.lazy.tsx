import { Layout } from "@/components/layout";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/invoices")({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

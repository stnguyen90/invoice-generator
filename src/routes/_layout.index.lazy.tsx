import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<h2>Invoices</h2>
		</div>
	);
}

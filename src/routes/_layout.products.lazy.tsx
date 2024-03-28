import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/products")({
	component: Products,
});

function Products() {
	return (
		<div className="p-2">
			<h2>Products</h2>
		</div>
	);
}

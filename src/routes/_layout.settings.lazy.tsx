import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/settings")({
	component: Settings,
});

function Settings() {
	return (
		<div className="p-2">
			<h2>Settings</h2>
		</div>
	);
}

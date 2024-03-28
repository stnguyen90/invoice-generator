import { account } from "@/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type React from "react";
import googleLogo from "../../assets/google.svg";

export const Route = createLazyFileRoute("/auth/sign-in")({
	component: SignIn,
});

function SignIn() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const search = Route.useSearch<{ redirect?: string }>();

	// Mutations
	const mutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: { email: string; password: string }) =>
			account.createEmailPasswordSession(email, password),
		onSuccess: async () => {
			// Invalidate and refetch
			await queryClient.invalidateQueries({ queryKey: ["account"] });

			const to = search.redirect || "/";
			console.log(`Navigating to ${to}`);
			navigate({ to, replace: true});
		},
	});

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();

		mutation.mutate({
			email: (event.target as HTMLFormElement).email.value,
			password: (event.target as HTMLFormElement).password.value,
		});
	}
	return (
		<div className="container relative h-screen flex flex-col items-center justify-center">
			<div className="lg:p-8 h-2/3">
				<div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
					<div className="flex flex-col space-y-4 text-center">
						<h1 className="text-5xl tracking-tight">Sign in</h1>
						<p className="text-sm text-muted-foreground">
							Start sending flawless invoices today
						</p>
					</div>
					<div className="grid gap-6">
						<form onSubmit={onSubmit}>
							<div className="grid gap-6">
								<div className="grid gap-1">
									<Label className="sr-only" htmlFor="email">
										Email address
									</Label>
									<Input
										id="email"
										placeholder="Email address"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={mutation.isPending}
									/>
								</div>
								<div className="grid gap-1">
									<Label className="sr-only" htmlFor="password">
										Password
									</Label>
									<Input
										id="password"
										placeholder="Password"
										type="password"
										autoCapitalize="none"
										autoComplete="password"
										autoCorrect="off"
										disabled={mutation.isPending}
									/>
								</div>
								<Button disabled={mutation.isPending}>
									{mutation.isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Sign in
								</Button>
							</div>
						</form>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="bg-background px-2 text-muted-foreground">
									or
								</span>
							</div>
						</div>
						<Button
							variant="outline"
							type="button"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<img src={googleLogo} alt="Google" className="mr-2 h-4 w-4" />
							)}{" "}
							Sign in with Google
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

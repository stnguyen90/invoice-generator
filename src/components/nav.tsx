"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface NavProps {
	isCollapsed: boolean;
	links: {
		path: string;
		title: string;
		label?: string;
		icon: LucideIcon;
	}[];
}

export function Nav({ links, isCollapsed }: NavProps) {
	const { location } = useRouterState();

	const currentPath = location.pathname;
	console.log(currentPath);

	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link) =>
					isCollapsed ? (
						<Tooltip key={link.path} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									to={link.path}
									className={cn(
										buttonVariants({
											variant:
												currentPath === link.path ? "secondary" : "ghost",
											size: "icon",
										}),
										"h-9 w-9",
									)}
								>
									<link.icon className="h-4 w-4" />
									<span className="sr-only">{link.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right" className="flex items-center gap-4">
								{link.title}
								{link.label && (
									<span
										className={cn(
											"ml-auto text-muted-foreground",
											currentPath === link.path && "font-semibold",
										)}
									>
										{link.label}
									</span>
								)}
							</TooltipContent>
						</Tooltip>
					) : (
						<Link
							key={link.path}
							to={link.path}
							className={cn(
								buttonVariants({
									variant: currentPath === link.path ? "secondary" : "ghost",
									// size: "sm",
								}),
								"justify-start",
								currentPath === link.path && "font-semibold",
							)}
						>
							<link.icon className="mr-2 h-4 w-4" />
							{link.title}
							{link.label && (
								<span
									className={cn(
										"ml-auto",
										currentPath === link.path && "font-semibold",
									)}
								>
									{link.label}
								</span>
							)}
						</Link>
					),
				)}
			</nav>
		</div>
	);
}

import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  FileText,
  HelpCircle,
  type LucideIcon,
  Package2,
  Settings,
  UserRound,
} from "lucide-react";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const links: {
    path: string;
    title: string;
    label?: string;
    icon: LucideIcon;
  }[] = [
    { path: "/", title: "Invoices", label: "", icon: FileText },
    { path: "/clients", title: "Clients", label: "", icon: UserRound },
    { path: "/products", title: "Products", label: "", icon: Package2 },
    { path: "/settings", title: "Settings", label: "", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-row p-4 justify-between">
        <div className="flex flex-row items-center">
          <img src={logo} alt="Invoicestar logo" className="w-6 h-6 mr-2" />
          <h1 className="text-2xl">Invoicestar</h1>
        </div>
        <div className="flex flex-row items-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="m-4" />
          <Avatar>
            <AvatarImage src={profile} alt="Brooklyn Simmons" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2">
            <p>Brooklyn Simmons</p>
            <p className="text-muted-foreground">SpectrumCraft</p>
          </div>
        </div>
      </header>
      <Separator />
      <div className="flex h-full">
        <div className="flex flex-col w-[200px]">
          <Nav isCollapsed={false} links={links} />
        </div>
        <main className="flex grow p-4 border-l bg-gray-50">{children}</main>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Pencil,
  FileText,
  Bot,
  LogOut,
  Library,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/syllabus", label: "Syllabus", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Pencil },
  { href: "/mock-tests", label: "Mock Tests", icon: FileText },
  { href: "/study-plan", label: "Study Plan", icon: Bot },
  { href: "/my-library", label: "My Library", icon: Library },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg font-headline text-primary"
        >
          <Icons.logo className="w-6 h-6" />
          <span>KARTET Prep</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              }
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter>
        <Separator className="my-2" />
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </SidebarFooter>
    </>
  );
}

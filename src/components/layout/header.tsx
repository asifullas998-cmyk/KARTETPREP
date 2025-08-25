
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Globe, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/syllabus": "Syllabus",
    "/practice": "Practice",
    "/mock-tests": "Mock Tests",
    "/mock-tests/paper-1": "Mock Test",
    "/mock-tests/paper-2": "Mock Test",
    "/study-plan": "Study Plan",
    "/my-library": "My Library",
    "/login": "Login",
    "/register": "Register",
};


export function Header() {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    // For dynamic routes like /mock-tests/[id]
    if (path.startsWith('/mock-tests/')) {
        return pageTitles['/mock-tests/paper-1'];
    }
    return pageTitles[path] || "KARTET Prep";
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-xl font-semibold tracking-tight font-headline">
        {getPageTitle(pathname)}
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Switch language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
            <DropdownMenuItem>اردو (Urdu)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

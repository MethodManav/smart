"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Home,
  LogOut,
  Menu,
  MessageSquarePlus,
  Settings,
  Settings2Icon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Create Post", href: "/create", icon: MessageSquarePlus },
  { name: "Scheduled Posts", href: "/scheduled", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading for animation demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card animate-fade-in">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
            <h1 className="text-xl font-semibold animated-gradient-text">
              SocialSync
            </h1>
          </div>
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1 staggered-fade-in">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 animated-button"
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors animated-icon"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t border-border">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={user?.picture ? user.picture : "/placeholder-logo.png"}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {user?.nickname ? user.nickname : "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user ? user.email : "user"}
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings2Icon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    router.push("/api/auth/logout");
                  }}
                  className="text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center h-16 px-4 border-b border-border bg-card w-full justify-between animate-fade-in">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="animated-button">
              <Menu className="h-6 w-6 animated-icon hover-rotate" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
                <h1 className="text-xl font-semibold animated-gradient-text">
                  SocialSync
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto animated-button"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="h-5 w-5 animated-icon hover-rotate" />
                </Button>
              </div>
              <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
                <nav className="flex-1 px-2 space-y-1 staggered-fade-in">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 animated-button"
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                          "mr-3 h-5 w-5 flex-shrink-0 transition-colors animated-icon"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4 border-t border-border">
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium animate-pulse-slow">
                      US
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">User Name</p>
                      <p className="text-xs text-muted-foreground">
                        user@example.com
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="animated-button"
                  >
                    <LogOut className="h-5 w-5 animated-icon hover-rotate" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold animated-gradient-text">
          SocialSync
        </h1>
        <ModeToggle />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="animate-fade-in">{children}</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
      <p className="mt-4 text-muted-foreground animate-pulse-slow">
        Loading...
      </p>
    </div>
  );
}

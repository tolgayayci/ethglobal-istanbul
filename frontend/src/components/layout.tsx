"use client";

import Image from "next/image";
import { Sidebar } from "@/components/sidebar-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-mode";
import { LucideCommand } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-screen grid grid-rows-[auto_1fr]">
          <header className="flex flex-row items-center space-x-2 py-4 w-full justify-between border-b px-4">
            <LucideCommand />
            <div className="flex flex-row space-x-2">
              <w3m-button />
              <ModeToggle />
            </div>
          </header>

          <div className="grid grid-cols-[4fr_1fr] w-full h-full">
            <div className="p-8">{children}</div>
            <Sidebar />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

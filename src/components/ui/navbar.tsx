'use client';

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={cn(
                "text-xl font-bold tracking-tight",
                "bg-gradient-to-r from-blue-500 to-blue-600",
                "bg-clip-text text-transparent",
                "drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
              )}
            >
              Noteflow
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-6 mr-6">
              <Link href="#features" className="text-neutral-600 hover:text-blue-500 transition-colors tracking-tight">
                Features
              </Link>
              <Link href="#testimonials" className="text-neutral-600 hover:text-blue-500 transition-colors tracking-tight">
                Testimonials
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-neutral-600 hover:text-blue-500 transition-colors tracking-tight">
                Log in
              </Link>
              <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
                <Link href="#">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
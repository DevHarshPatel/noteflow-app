'use client';

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 dark:border-neutral-800">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          Noteflow
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="#features"
            className="hidden md:inline-flex px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="hidden md:inline-flex px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/notes"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all hover:shadow-md active:scale-[0.98]"
          >
            Open App
          </Link>
        </div>
      </nav>
    </header>
  );
}
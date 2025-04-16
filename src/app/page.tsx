'use client';

import { Navbar } from "@/components/ui/navbar";
import { FeaturesSection } from "@/components/ui/features-section";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Footer } from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahj",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Noteflow has completely transformed how I organize my research. The color-coding system is intuitive and the search functionality is lightning fast.",
    href: "https://twitter.com/sarahj"
  },
  {
    author: {
      name: "Michael Chen",
      handle: "@michaeldev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a developer, I need a note-taking app that's both powerful and simple. Noteflow delivers on both counts. The folder structure is exactly what I needed.",
    href: "https://twitter.com/michaeldev"
  },
  {
    author: {
      name: "Emily Rodriguez",
      handle: "@emilyr",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The AI-powered organization features are a game-changer. It automatically categorizes my notes and suggests relevant connections I would have missed.",
    href: "https://twitter.com/emilyr"
  },
  {
    author: {
      name: "David Kim",
      handle: "@davidk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "I've tried dozens of note-taking apps, but Noteflow's combination of simplicity and power is unmatched. The cloud sync works flawlessly across all my devices.",
    href: "https://twitter.com/davidk"
  },
  {
    author: {
      name: "Lisa Thompson",
      handle: "@lisat",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "The end-to-end encryption gives me peace of mind knowing my sensitive notes are secure. Noteflow is the perfect balance of security and usability.",
    href: "https://twitter.com/lisat"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="relative bg-background text-foreground py-12 px-4 md:py-24 lg:py-32 overflow-hidden">
          <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
            <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
              {/* Heading */}
              <h1
                className={cn(
                  "inline-block animate-appear",
                  "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
                  "bg-clip-text text-transparent",
                  "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                  "leading-[1.1] sm:leading-[1.1]",
                  "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                )}
              >
                Organize your thoughts. One color-coded folder at a time.
              </h1>

              {/* Description */}
              <p
                className={cn(
                  "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
                  "text-base sm:text-lg md:text-xl",
                  "text-muted-foreground",
                  "font-medium",
                )}
              >
                Noteflow is the fastest way to take notes, search them, and stay organized.
              </p>

              {/* CTAs */}
              <div
                className="relative z-10 flex flex-wrap justify-center gap-4 
                animate-appear opacity-0 [animation-delay:300ms]"
              >
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "bg-gradient-to-b from-brand to-brand/90 dark:from-brand/90 dark:to-brand/80",
                    "hover:from-brand/95 hover:to-brand/85 dark:hover:from-brand/80 dark:hover:to-brand/70",
                    "text-white shadow-lg",
                    "transition-all duration-300",
                  )}
                >
                  <a href="/notes">Try it free</a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className={cn(
                    "text-foreground/80 dark:text-foreground/70",
                    "transition-all duration-300",
                  )}
                >
                  <a href="#features">View features</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Glow
              variant="above"
              className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
            />
          </div>
        </section>

        <section id="features" className="px-4 py-20 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">
              Everything you need to stay organized
            </h2>
            <FeaturesSection />
          </div>
        </section>

        <TestimonialsSection
          title="Loved by thousands of users"
          description="Join the growing community of professionals who trust Noteflow for their note-taking needs"
          testimonials={testimonials}
        />
      </div>
      <Footer />
    </main>
  );
} 
import { HeroWithMockup } from "@/components/blocks/hero-with-mockup"

export function HeroDemo() {
  return (
    <HeroWithMockup
      title="Organize your thoughts. One color-coded folder at a time."
      description="Noteflow is the fastest way to take notes, search them, and stay organized."
      primaryCta={{
        text: "Try it free",
        href: "/signup",
      }}
      secondaryCta={{
        text: "View features",
        href: "/features",
      }}
      mockupImage={{
        src: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Noteflow app interface",
        width: 1200,
        height: 800,
      }}
    />
  )
} 
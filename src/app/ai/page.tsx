"use client";

import { AIChat } from "@/components/ui/ai-chat";

export default function AIPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 relative">
        <AIChat />
      </div>
    </div>
  );
} 
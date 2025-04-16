"use client";

import { useState } from 'react';
import { AIInputWithSuggestions } from '@/components/ui/ai-input-with-suggestions';
import { CharacterEffect } from '@/components/ui/character-effect';
import { Bot, Sparkles, Stars, Zap, Tag, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const SUMMARY_RESPONSES = [
  "Here's what I gathered: You're planning ahead and staying creative.",
  "Looks like you're getting things in order with a touch of creativity.",
  "From what I see, you're organizing ideas with style.",
  "Seems like you're crafting thoughtful plans with a creative twist.",
  "You're making moves and keeping the ideas flowing.",
  "This note shows clear planning and inspired thinking.",
  "You're on top of things — organized and imaginative.",
  "Looks like you're putting intention and creativity into action.",
  "You're setting up for success with both structure and flair.",
  "This feels like a well-thought-out plan with your unique spark."
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  selectedNotes?: string[];
}

const AI_ACTIONS = [
  {
    text: "Summarize",
    icon: Stars,
    colors: {
      icon: "text-amber-600",
      border: "border-amber-500",
      bg: "bg-amber-100",
    },
  },
  {
    text: "Improve Writing",
    icon: Zap,
    colors: {
      icon: "text-purple-600",
      border: "border-purple-500",
      bg: "bg-purple-100",
    },
  },
  {
    text: "Generate Ideas",
    icon: Sparkles,
    colors: {
      icon: "text-blue-600",
      border: "border-blue-500",
      bg: "bg-blue-100",
    },
  },
];

export default function NotesAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const handleSubmit = async (text: string, action?: string) => {
    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: text,
      selectedNotes: selectedNotes.length > 0 ? [...selectedNotes] : undefined
    }]);
    
    // Reset selected notes
    setSelectedNotes([]);
    
    // Simulate AI typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate response based on action
    let response = '';
    if (action === 'Summarize') {
      response = SUMMARY_RESPONSES[Math.floor(Math.random() * SUMMARY_RESPONSES.length)];
    } else {
      response = SUMMARY_RESPONSES[Math.floor(Math.random() * SUMMARY_RESPONSES.length)];
    }
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const toggleNoteSelection = (noteTitle: string) => {
    setSelectedNotes(prev => 
      prev.includes(noteTitle)
        ? prev.filter(title => title !== noteTitle)
        : [...prev, noteTitle]
    );
  };

  // Example notes - in a real app, these would come from your notes state
  const availableNotes = [
    "Weekend Plans",
    "Project Deadlines",
    "Creative Ideas",
    "Meeting Notes",
  ];

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-neutral-800 dark:border-neutral-700 p-4 flex flex-col shadow-[0_1px_3px_0_rgb(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/notes" className="font-semibold text-xl text-neutral-800 dark:text-white">
              Noteflow
            </Link>
            <Link 
              href="/notes" 
              className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
            >
              <Home size={18} />
            </Link>
          </div>
        </div>

        <div className="space-y-1 flex-1">
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
            Select notes to reference
          </h2>
          {availableNotes.map(note => (
            <button
              key={note}
              onClick={() => toggleNoteSelection(note)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm transition-all rounded-lg",
                "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                selectedNotes.includes(note)
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500 dark:text-blue-400"
                  : "text-neutral-600 dark:text-neutral-300"
              )}
            >
              <Tag size={16} />
              <span>{note}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 mt-20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 max-w-xl",
                message.role === 'assistant' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === 'assistant' 
                  ? "bg-gradient-to-br from-purple-500 to-blue-500" 
                  : "bg-neutral-200 dark:bg-neutral-800"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                )}
              </div>
              <div className="space-y-2">
                {message.selectedNotes && message.selectedNotes.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {message.selectedNotes.map(note => (
                      <span
                        key={note}
                        className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}
                <div className={cn(
                  "rounded-xl px-4 py-3 max-w-sm border shadow-sm",
                  message.role === 'assistant' 
                    ? "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                    : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                )}>
                  <div className="text-sm leading-relaxed">
                    <CharacterEffect 
                      trigger={true}
                      className="text-sm"
                      delay={0.1}
                    >
                      {message.content}
                    </CharacterEffect>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t dark:border-neutral-800 mt-auto">
          <AIInputWithSuggestions
            actions={AI_ACTIONS}
            placeholder="Message AI assistant..."
            onSubmit={handleSubmit}
            className="py-4 px-4"
          />
        </div>
      </main>
    </div>
  );
} 
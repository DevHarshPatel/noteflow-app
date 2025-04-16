import { useState } from 'react';
import { AIInputWithSuggestions } from './ai-input-with-suggestions';
import { CharacterEffect } from './character-effect';
import { Bot, Sparkles, Stars, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AI_ACTIONS = [
  {
    text: "Generate Ideas",
    icon: Sparkles,
    colors: {
      icon: "text-purple-600",
      border: "border-purple-500",
      bg: "bg-purple-100",
    },
  },
  {
    text: "Improve Writing",
    icon: Zap,
    colors: {
      icon: "text-amber-600",
      border: "border-amber-500",
      bg: "bg-amber-100",
    },
  },
  {
    text: "Get Creative",
    icon: Stars,
    colors: {
      icon: "text-blue-600",
      border: "border-blue-500",
      bg: "bg-blue-100",
    },
  },
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (text: string, action?: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Simulate AI typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add AI response
    const response = `Here's my response to your message about "${text}"${action ? ` with action "${action}"` : ''}.
I'm here to help you be more productive and creative!`;
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className={cn(
              "rounded-2xl px-4 py-2 max-w-sm",
              message.role === 'assistant' 
                ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 dark:text-white"
            )}>
              <CharacterEffect trigger={true}>
                {message.content}
              </CharacterEffect>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 max-w-xl ml-auto flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="rounded-2xl px-4 py-2 bg-gradient-to-br from-purple-500 to-blue-500">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t dark:border-neutral-800">
        <AIInputWithSuggestions
          actions={AI_ACTIONS}
          placeholder="Message AI assistant..."
          onSubmit={handleSubmit}
          className="py-2"
        />
      </div>
    </div>
  );
} 
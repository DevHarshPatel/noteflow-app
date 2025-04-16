"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface NoteCardProps {
  title: string;
  preview: string;
  date: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export function NoteCard({ 
  title, 
  preview, 
  date,
  onClick,
  onDelete
}: NoteCardProps) {
  // Get first line and remove any HTML tags
  const firstLine = preview
    .split('\n')[0]
    .replace(/<[^>]*>/g, '')
    .trim();
  
  // Truncate if too long
  const truncatedPreview = firstLine.length > 100 
    ? firstLine.slice(0, 100) + '...'
    : firstLine + '...';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
    >
      <button
        onClick={onClick}
        className="w-full text-left p-4"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-neutral-800 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-1 mb-2">
          {truncatedPreview}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
            {date}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </button>
    </motion.div>
  );
} 
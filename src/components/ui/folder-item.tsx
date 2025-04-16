"use client";

import { cn } from "@/lib/utils";
import { Folder, MoreHorizontal } from "lucide-react";

interface FolderItemProps {
  name: string;
  color: string;
  isActive?: boolean;
  noteCount?: number;
  onClick?: () => void;
  onEdit?: () => void;
  settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  };
}

export function FolderItem({ 
  name, 
  color, 
  isActive, 
  noteCount = 0,
  onClick,
  onEdit,
  settings,
}: FolderItemProps) {
  return (
    <div className="group flex items-center">
      <button
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
          "border border-transparent hover:border-neutral-200/50 dark:hover:border-neutral-700",
          "hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm",
          isActive && "bg-white dark:bg-neutral-800 border-neutral-200/50 dark:border-neutral-700 shadow-sm",
        )}
      >
        <div 
          className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
          style={{ 
            backgroundColor: `${color}${settings.theme === 'dark' ? '30' : '15'}`,
          }}
        >
          <Folder 
            size={14} 
            style={{ color: settings.theme === 'dark' ? `${color}CC` : color }}
          />
        </div>
        <span className="font-medium text-neutral-700 dark:text-neutral-200">{name}</span>
        {noteCount > 0 && (
          <span className="ml-auto text-xs text-neutral-400 dark:text-neutral-500">
            {noteCount}
          </span>
        )}
      </button>
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-all"
        >
          <MoreHorizontal size={16} />
        </button>
      )}
    </div>
  );
} 
"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder?: {
    id: number;
    name: string;
    color: string;
  };
  onSave: (name: string, color: string) => void;
  onDelete?: () => void;
  settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  };
}

const COLORS = [
  { name: "Orange", value: "#FF8400" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Indigo", value: "#6366F1" },
];

export function FolderModal({
  isOpen,
  onClose,
  folder,
  onSave,
  onDelete,
  settings,
}: FolderModalProps) {
  const [name, setName] = useState(folder?.name || "");
  const [color, setColor] = useState(folder?.color || COLORS[0].value);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-x-4 top-[20%] z-50 mx-auto max-w-md"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b dark:border-neutral-700">
                <h2 className="text-lg font-medium text-neutral-800 dark:text-white">
                  {folder ? "Edit Folder" : "New Folder"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter folder name"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    autoFocus
                  />
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Color
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setColor(c.value)}
                        className="w-8 h-8 rounded-lg transition-all hover:scale-110 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:ring-offset-neutral-800"
                        style={{ 
                          backgroundColor: settings.theme === 'dark' ? `${c.value}CC` : c.value
                        }}
                        title={c.name}
                        aria-label={c.name}
                      >
                        {color === c.value && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-b-2xl">
                <div>
                  {folder && (
                    <button
                      onClick={onDelete}
                      className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Delete Folder
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (name.trim()) {
                        onSave(name.trim(), color);
                        onClose();
                      }
                    }}
                    disabled={!name.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {folder ? "Save Changes" : "Create Folder"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
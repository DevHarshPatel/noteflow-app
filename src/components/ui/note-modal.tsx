"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RichTextEditor } from "./rich-text-editor";
import { useState, useEffect } from "react";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onSave: (title: string, content: string) => void;
  settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  };
}

export function NoteModal({
  isOpen,
  onClose,
  title: initialTitle,
  content: initialContent,
  onSave,
  settings,
}: NoteModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // Update state when props change
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

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
            className="fixed inset-4 z-50 mx-auto max-w-4xl h-[calc(100vh-2rem)]"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b dark:border-neutral-800">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled Note"
                  className="text-lg font-medium bg-transparent border-none outline-none text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-0"
                />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing..."
                  settings={settings}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end px-6 py-4 border-t dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-b-2xl">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (title.trim() || content.trim()) {
                        onSave(title.trim() || "Untitled Note", content);
                        onClose();
                      }
                    }}
                    disabled={!title.trim() && !content.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save Note
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
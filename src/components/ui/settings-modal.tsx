"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  };
  onUpdateSettings: (settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  }) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsModalProps) {
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
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b dark:border-neutral-800">
                <h2 className="text-lg font-medium dark:text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      Theme
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Choose your preferred appearance
                    </p>
                  </div>
                  <select
                    value={settings.theme}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        theme: e.target.value as "light" | "dark",
                      })
                    }
                    className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                {/* Beta Features Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      Beta Features
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Try out experimental features
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      onUpdateSettings({
                        ...settings,
                        betaFeatures: !settings.betaFeatures,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.betaFeatures
                        ? "bg-blue-500"
                        : "bg-neutral-200 dark:bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.betaFeatures ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Note AI Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      Note AI
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Enable AI-powered note suggestions
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      onUpdateSettings({
                        ...settings,
                        noteAI: !settings.noteAI,
                      })
                    }
                    disabled={!settings.betaFeatures}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.noteAI && settings.betaFeatures
                        ? "bg-blue-500"
                        : "bg-neutral-200 dark:bg-neutral-700"
                    } ${
                      !settings.betaFeatures
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.noteAI && settings.betaFeatures
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end px-6 py-4 border-t dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-b-2xl">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all hover:shadow-md active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Settings, UserCircle, Sparkles, Menu } from "lucide-react";
import { FolderItem } from "@/components/ui/folder-item";
import { NoteCard } from "@/components/ui/note-card";
import { NoteModal } from "@/components/ui/note-modal";
import { FolderModal } from "@/components/ui/folder-modal";
import { SettingsModal } from "@/components/ui/settings-modal";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Folder {
  id: number;
  name: string;
  color: string;
}

interface Note {
  id: number;
  folderId: number;
  title: string;
  content: string;
  date: string;
}

interface AppSettings {
  theme: "light" | "dark";
  betaFeatures: boolean;
  noteAI: boolean;
}

const initialFolders: Folder[] = [
  { id: 1, name: "Personal", color: "#FF8400" },
  { id: 2, name: "Work", color: "#3B82F6" },
  { id: 3, name: "Ideas", color: "#8B5CF6" },
  { id: 4, name: "Projects", color: "#EC4899" },
];

const initialNotes: Note[] = [
  // Personal Notes (3 notes)
  {
    id: 1,
    folderId: 1,
    title: "Weekend Plans",
    content: "Going hiking with friends on Saturday. Need to pack: water, snacks, sunscreen, hiking boots, and a first aid kit. Meeting point: Mountain Trail Parking at 7 AM.",
    date: "2024-03-15",
  },
  {
    id: 2,
    folderId: 1,
    title: "Birthday Gift Ideas",
    content: "Mom's birthday coming up next month. Gift ideas: 1. Cooking class subscription 2. Vintage cookbook collection 3. New garden tools 4. Spa day package",
    date: "2024-03-14",
  },
  {
    id: 3,
    folderId: 1,
    title: "Shopping List",
    content: "Groceries: eggs, milk, bread, fruits\nHousehold: paper towels, dish soap\nPharmacy: vitamins, band-aids",
    date: "2024-03-13",
  },
  // Work Notes (4 notes)
  {
    id: 4,
    folderId: 2,
    title: "Project Deadlines",
    content: "Q1 goals need to be completed by end of March. Focus on user research and prototyping. Schedule final review meeting with stakeholders.",
    date: "2024-03-12",
  },
  {
    id: 5,
    folderId: 2,
    title: "Meeting Notes: Team Sync",
    content: "Discussion points: 1. New feature rollout timeline 2. Performance improvements 3. User feedback implementation 4. Resource allocation for Q2",
    date: "2024-03-11",
  },
  {
    id: 6,
    folderId: 2,
    title: "Client Feedback Summary",
    content: "Key points from user testing:\n- Faster loading times needed\n- Love the new UI design\n- Request for dark mode\n- Mobile responsiveness issues on older devices",
    date: "2024-03-10",
  },
  {
    id: 7,
    folderId: 2,
    title: "Weekly Status Update",
    content: "Achievements:\n- Launched new dashboard\n- Fixed 12 critical bugs\n- Improved load time by 40%\nNext week: Focus on mobile optimization",
    date: "2024-03-09",
  },
  // Ideas Notes (2 notes)
  {
    id: 8,
    folderId: 3,
    title: "App Feature Ideas",
    content: "1. Dark mode with custom themes 2. Cloud sync with version history 3. AI-powered note categorization 4. Voice notes with transcription",
    date: "2024-03-08",
  },
  {
    id: 9,
    folderId: 3,
    title: "Blog Post Topics",
    content: "1. The Future of Note-Taking Apps 2. Productivity Tips for Remote Work 3. How AI is Changing Personal Organization 4. Digital Minimalism Guide",
    date: "2024-03-07",
  },
  // Projects Notes (1 note)
  {
    id: 10,
    folderId: 4,
    title: "Home Renovation Plan",
    content: "Phase 1: Kitchen remodel - Get contractor quotes, choose appliances, select color scheme. Phase 2: Bathroom update - New fixtures, tile selection, lighting.",
    date: "2024-03-06",
  },
];

export default function NotesPage() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeFolder, setActiveFolder] = useState<number | null>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Try to load settings from localStorage
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('noteflow-settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    }
    return {
      theme: 'light',
      betaFeatures: false,
      noteAI: false,
    };
  });

  // Apply theme changes
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('noteflow-settings', JSON.stringify(settings));
  }, [settings]);

  const activeNotes = notes.filter(note => 
    (!activeFolder || note.folderId === activeFolder) &&
    (!searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSaveNote = (title: string, content: string) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...note, title, content }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now(),
        folderId: activeFolder!,
        title,
        content,
        date: new Date().toISOString().split('T')[0],
      };
      setNotes([...notes, newNote]);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleSaveFolder = (name: string, color: string) => {
    if (editingFolder) {
      // Update existing folder
      setFolders(folders.map(folder =>
        folder.id === editingFolder.id
          ? { ...folder, name, color }
          : folder
      ));
    } else {
      // Create new folder
      const newFolder: Folder = {
        id: Date.now(),
        name,
        color,
      };
      setFolders([...folders, newFolder]);
    }
  };

  const handleDeleteFolder = () => {
    if (!editingFolder) return;
    
    if (confirm('Are you sure you want to delete this folder? All notes in this folder will be deleted.')) {
      setFolders(folders.filter(folder => folder.id !== editingFolder.id));
      setNotes(notes.filter(note => note.folderId !== editingFolder.id));
      if (activeFolder === editingFolder.id) {
        setActiveFolder(null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar Toggle for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-md border dark:border-neutral-700"
      >
        <Menu className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r bg-white dark:bg-neutral-800 dark:border-neutral-700 p-4 flex flex-col shadow-[0_1px_3px_0_rgb(0,0,0,0.1)]",
        "fixed inset-y-0 left-0 z-40 lg:relative",
        "transform transition-transform duration-200 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-semibold text-xl text-neutral-800 dark:text-white">Noteflow</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearching(!isSearching)}
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => {
                setEditingFolder(null);
                setIsFolderModalOpen(true);
              }}
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </motion.div>
        )}

        <div className="space-y-1 flex-1">
          {folders.map(folder => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              color={folder.color}
              isActive={folder.id === activeFolder}
              noteCount={notes.filter(note => note.folderId === folder.id).length}
              onClick={() => setActiveFolder(folder.id)}
              onEdit={() => {
                setEditingFolder(folder);
                setIsFolderModalOpen(true);
              }}
              settings={settings}
            />
          ))}
        </div>

        {/* AI Chat Link */}
        {settings.betaFeatures && settings.noteAI && (
          <Link 
            href="/notes/ai"
            className="mt-4 flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <Sparkles size={18} />
            <span>AI Chat</span>
          </Link>
        )}

        {/* Account and Settings */}
        <div className="pt-4 mt-4 border-t dark:border-neutral-700 flex items-center gap-2">
          <Link
            href="/notes/account"
            className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <UserCircle size={20} />
            <span>Account</span>
          </Link>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 p-8 overflow-auto transition-all duration-200",
        "lg:ml-0",
        isSidebarOpen ? "ml-64" : "ml-0"
      )}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-neutral-800 dark:text-white">
              {activeFolder ? folders.find(f => f.id === activeFolder)?.name : "All Notes"}
            </h2>
            <button
              onClick={() => {
                setEditingNote(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              New Note
            </button>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 gap-4">
            {activeNotes.map(note => (
              <NoteCard
                key={note.id}
                title={note.title}
                preview={note.content}
                date={note.date}
                onClick={() => {
                  setEditingNote(note);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        title={editingNote?.title || ""}
        content={editingNote?.content || ""}
        onSave={handleSaveNote}
        settings={settings}
      />

      <FolderModal
        isOpen={isFolderModalOpen}
        onClose={() => {
          setIsFolderModalOpen(false);
          setEditingFolder(null);
        }}
        folder={editingFolder || undefined}
        onSave={handleSaveFolder}
        onDelete={editingFolder ? handleDeleteFolder : undefined}
        settings={settings}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
  );
} 
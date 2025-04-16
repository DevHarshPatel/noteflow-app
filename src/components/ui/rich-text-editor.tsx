"use client";

import { useCallback, useState, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Color from '@tiptap/extension-color';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Highlighter,
  Maximize2,
  Minimize2,
  Palette,
  Type,
  Undo,
  Redo,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TextShimmer } from './text-shimmer';
import { TextEffect } from './text-effect';

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  settings: {
    theme: "light" | "dark";
    betaFeatures: boolean;
    noteAI: boolean;
  };
}

const TEXT_COLORS = [
  { name: 'Default', color: 'inherit' },
  { name: 'Purple', color: '#9333EA' },
  { name: 'Red', color: '#E11D48' },
  { name: 'Yellow', color: '#FBBF24' },
  { name: 'Blue', color: '#2563EB' },
  { name: 'Green', color: '#16A34A' },
  { name: 'Orange', color: '#EA580C' },
  { name: 'Pink', color: '#DB2777' },
];

const HIGHLIGHT_COLORS = [
  { name: 'Default', color: '#ffffff00' },
  { name: 'Purple', color: '#F6F3F8' },
  { name: 'Red', color: '#FEE2E2' },
  { name: 'Yellow', color: '#FEF3C7' },
  { name: 'Blue', color: '#DBEAFE' },
  { name: 'Green', color: '#DCFCE7' },
  { name: 'Orange', color: '#FFEDD5' },
  { name: 'Pink', color: '#FCE7F3' },
];

export function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start writing...',
  settings,
}: RichTextEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTextColors, setShowTextColors] = useState(false);
  const [showHighlightColors, setShowHighlightColors] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponseText, setAIResponseText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-4',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-neutral-200 dark:border-neutral-700 pl-4 italic',
          },
        },
      }),
      Typography,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-4 dark:text-blue-400',
        },
      }),
      Underline,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-neutral-400 dark:before:text-neutral-500 before:h-0 before:float-left before:pointer-events-none",
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert focus:outline-none max-w-full min-h-[200px] dark:text-neutral-100',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleAIAssist = async () => {
    setIsAILoading(true);
    setShowAIResponse(false);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAIResponseText("Here's a quick summary of your note:\nYou're planning ahead and staying creative.");
    setIsAILoading(false);
    setShowAIResponse(true);
  };

  if (!editor) return null;

  const ToolbarButton = ({
    isActive = false,
    onClick,
    children,
    className,
    disabled = false,
  }: {
    isActive?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors relative',
        'text-neutral-600 dark:text-neutral-300',
        isActive && 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );

  const ColorButton = ({ color, onClick, isActive }: { color: string; onClick: () => void; isActive?: boolean }) => (
    <button
      className={cn(
        'w-6 h-6 rounded border border-gray-200 transition-all',
        isActive && 'ring-2 ring-blue-500 ring-offset-2'
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );

  return (
    <div
      className={cn(
        'border dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800',
        isFullscreen && 'fixed inset-0 z-50'
      )}
    >
      <div className="border-b dark:border-neutral-700 p-2 flex gap-1 flex-wrap bg-white dark:bg-neutral-800">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        >
          <UnderlineIcon className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          <Strikethrough className="h-5 w-5" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().unsetMark('textStyle').run()}
          isActive={!editor.isActive('textStyle')}
        >
          <span className="text-sm">Normal</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setMark('textStyle', { class: 'text-lg' }).run()}
          isActive={editor.isActive('textStyle', { class: 'text-lg' })}
        >
          <span className="text-base font-medium">Large</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setMark('textStyle', { class: 'text-xl' }).run()}
          isActive={editor.isActive('textStyle', { class: 'text-xl' })}
        >
          <span className="text-lg font-medium">XLarge</span>
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        <div className="relative">
          <ToolbarButton
            onClick={() => setShowTextColors(!showTextColors)}
            isActive={showTextColors}
          >
            <Type className="h-5 w-5" />
          </ToolbarButton>
          {showTextColors && (
            <div className="absolute top-full left-0 mt-1 p-2 grid grid-cols-4 gap-1 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-lg z-50 min-w-[160px]">
              {TEXT_COLORS.map(({ name, color }) => (
                <ColorButton
                  key={name}
                  color={color}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setShowTextColors(false);
                  }}
                  isActive={editor.isActive('textStyle', { color })}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <ToolbarButton
            onClick={() => setShowHighlightColors(!showHighlightColors)}
            isActive={showHighlightColors}
          >
            <Highlighter className="h-5 w-5" />
          </ToolbarButton>
          {showHighlightColors && (
            <div className="absolute top-full left-0 mt-1 p-2 grid grid-cols-4 gap-1 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-lg z-50 min-w-[160px]">
              {HIGHLIGHT_COLORS.map(({ name, color }) => (
                <ColorButton
                  key={name}
                  color={color}
                  onClick={() => {
                    editor.chain().focus().toggleHighlight({ color }).run();
                    setShowHighlightColors(false);
                  }}
                  isActive={editor.isActive('highlight', { color })}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          className="relative group"
        >
          <List className="h-5 w-5" />
          <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded whitespace-nowrap">
            Bullet List
          </div>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          className="relative group"
        >
          <ListOrdered className="h-5 w-5" />
          <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded whitespace-nowrap">
            Numbered List
          </div>
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          className="relative group"
        >
          <Quote className="h-5 w-5" />
          <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded whitespace-nowrap">
            Quote
          </div>
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}>
          <LinkIcon className="h-5 w-5" />
        </ToolbarButton>

        <div className="flex-1" />

        <ToolbarButton
          onClick={() => setIsFullscreen(!isFullscreen)}
          isActive={isFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </ToolbarButton>
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-neutral-700 flex overflow-hidden"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              'p-2 hover:bg-muted',
              editor.isActive('bold') && 'bg-muted'
            )}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              'p-2 hover:bg-muted',
              editor.isActive('italic') && 'bg-muted'
            )}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              'p-2 hover:bg-muted',
              editor.isActive('underline') && 'bg-muted'
            )}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            onClick={setLink}
            className={cn(
              'p-2 hover:bg-muted',
              editor.isActive('link') && 'bg-muted'
            )}
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </BubbleMenu>
      )}

      <div
        className={cn(
          'p-4 bg-white dark:bg-neutral-800',
          isFullscreen && 'h-[calc(100vh-57px)] overflow-y-auto'
        )}
      >
        <EditorContent editor={editor} />
      </div>

      {/* AI Assist Button and Response */}
      {settings.betaFeatures && settings.noteAI && (
        <div className="flex flex-col gap-2 p-2 border-t dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <button
            onClick={handleAIAssist}
            disabled={isAILoading}
            className="flex items-center gap-2 p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={18} />
            {isAILoading ? (
              <TextShimmer
                className="text-sm font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.400)] dark:[--base-gradient-color:theme(colors.blue.200)]"
                duration={3}
              >
                Generating ideas...
              </TextShimmer>
            ) : (
              <span className="text-sm font-medium">AI Assist</span>
            )}
          </button>
          
          {showAIResponse && (
            <TextEffect
              className="px-2 py-1 text-sm"
              trigger={showAIResponse}
              onAnimationComplete={() => {}}
            >
              {aiResponseText}
            </TextEffect>
          )}
        </div>
      )}
    </div>
  );
} 
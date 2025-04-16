import { useRef, useEffect } from 'react';

interface UseAutoResizeTextareaProps {
  minHeight?: number;
  maxHeight?: number;
}

export function useAutoResizeTextarea({
  minHeight = 64,
  maxHeight = 200,
}: UseAutoResizeTextareaProps = {}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = (reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (reset) {
      textarea.style.height = `${minHeight}px`;
      return;
    }

    textarea.style.height = '0px';
    const scrollHeight = Math.max(textarea.scrollHeight, minHeight);
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const observer = new ResizeObserver(() => adjustHeight());
    observer.observe(textarea);

    return () => {
      observer.disconnect();
    };
  }, [maxHeight, minHeight]);

  return { textareaRef, adjustHeight };
} 
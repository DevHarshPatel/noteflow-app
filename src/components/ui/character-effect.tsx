import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';

interface CharacterEffectProps {
  children: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.1,
    },
  },
};

export function CharacterEffect({
  children,
  className,
  delay = 0,
  trigger = true,
  onAnimationComplete,
}: CharacterEffectProps) {
  // Split text into lines and then characters
  const lines = children.split('\n');
  const characters = lines.map(line => line.split(''));

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className={cn('space-y-1', className)}
          onAnimationComplete={onAnimationComplete}
        >
          {characters.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden flex flex-wrap">
              {line.map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  variants={characterVariants}
                  className="inline-block"
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
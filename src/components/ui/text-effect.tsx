'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';

interface TextEffectProps {
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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
    },
  },
};

export function TextEffect({
  children,
  className,
  delay = 0,
  trigger = true,
  onAnimationComplete,
}: TextEffectProps) {
  const lines = children.split('\n');

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: containerVariants.hidden,
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: delay,
              },
            },
            exit: containerVariants.exit,
          }}
          className={cn('space-y-1', className)}
          onAnimationComplete={onAnimationComplete}
        >
          {lines.map((line, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden"
            >
              <motion.p className="text-neutral-800 dark:text-neutral-200">
                {line}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

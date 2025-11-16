import { MessageCircle, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  hasMessages: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading, hasMessages }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasMessages && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit();
    // Refocus the input after submission
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <motion.div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          placeholder="Ask me about my work and experience..."
          className="w-full px-6 py-5 pr-16 rounded-full text-sm placeholder:text-neutral-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.15)',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: '#000000',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#333333';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
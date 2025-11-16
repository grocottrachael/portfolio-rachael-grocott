import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, X } from 'lucide-react';
import profileImage from 'figma:asset/480c09d663e40bc21ee2dec2f07edf81d50784b4.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatOverlayProps {
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
}

export function ChatOverlay({ messages, isLoading, onClose }: ChatOverlayProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {hasMessages && (
          <>
            {/* Backdrop blur */}
            <motion.div
              className="fixed inset-0 bg-white/30 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-full hover:bg-white/60 hover:scale-110 transition-all pointer-events-auto cursor-pointer"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-neutral-900" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Chat bubbles container - not wrapped in AnimatePresence so they disappear instantly */}
      {messages.length > 0 && (
        <div className="fixed inset-0 z-45 flex items-center justify-center pointer-events-none overflow-y-auto py-32">
          <div className="w-full max-w-2xl px-6 space-y-6 pointer-events-none">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 25, 
                  stiffness: 300,
                  delay: index * 0.05 
                }}
                className={`flex ${ 
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex flex-col items-start gap-2">
                    <img 
                      src={profileImage} 
                      alt="Rachael" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="relative">
                      <div
                        className="px-4 py-4 pointer-events-auto"
                        style={{
                          background: 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.6)',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                          borderRadius: '4px 24px 24px 24px',
                        }}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-left">{message.content}</p>
                      </div>
                    </div>
                  </div>
                )}
                {message.role === 'user' && (
                  <div className="relative">
                    <div
                      className="px-4 py-4 pointer-events-auto"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                        borderRadius: '24px 24px 4px 24px',
                      }}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-left">{message.content}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex flex-col items-start gap-2">
                  <img 
                    src={profileImage} 
                    alt="Rachael" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="relative">
                    <div 
                      className="px-4 py-4 pointer-events-auto"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                        borderRadius: '4px 24px 24px 24px',
                      }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-neutral-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}

export type { Message };
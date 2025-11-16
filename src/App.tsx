import { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { ChatInput } from './components/ChatInput';
import { ChatOverlay, Message } from './components/ChatOverlay';
import { projectId, publicAnonKey } from './utils/supabase/info';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      console.log('Sending message to chat endpoint with streaming...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-3e9b33b2/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            message: userMessage,
            history: newMessages.slice(0, -1) // Send all messages except the one we just added
          }),
        }
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const data = await response.json();
        console.error('Server error response:', data);
        throw new Error(data.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let firstChunk = true;

      if (!reader) {
        throw new Error('No reader available');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulatedText += parsed.text;
                
                if (firstChunk) {
                  // First chunk - add assistant message and stop loading
                  firstChunk = false;
                  setIsLoading(false);
                  setMessages([...newMessages, { role: 'assistant', content: accumulatedText }]);
                } else {
                  // Update the last message
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: accumulatedText };
                    return updated;
                  });
                }
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setIsLoading(false);
      // Focus input after completion
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }, 50);

    } catch (error) {
      console.error('Chat error:', error);
      console.error('Error details:', error instanceof Error ? error.message : error);
      
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again."
        }
      ]);
      
      setIsLoading(false);
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content - Everything above the fold */}
      <div className="min-h-screen flex flex-col md:justify-center px-6 md:px-12 lg:px-20 py-4">
        <Hero />
      </div>

      {/* Chat Interface */}
      <ChatOverlay messages={messages} isLoading={isLoading} onClose={() => setMessages([])} />
      <ChatInput 
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        hasMessages={messages.length > 0}
      />
    </div>
  );
}
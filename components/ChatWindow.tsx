"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { background, text, brand, border } from '@/lib/colors';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Unknown',
      text: 'Hello! Ready to start the interview?',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        text: inputValue.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-80 flex flex-col"
      style={{ 
        backgroundColor: background.white,
        borderLeft: `1px solid ${border.light}`,
        boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 40
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4"
        style={{ borderBottom: `1px solid ${border.light}` }}
      >
        <h3 className="font-bold text-lg" style={{ color: text.primary }}>
          Chat
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <X size={20} style={{ color: text.secondary }} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}
          >
            <div
              className="max-w-[80%] rounded-lg px-3 py-2"
              style={{
                backgroundColor: message.isOwn ? brand.navy : background.primary,
                color: message.isOwn ? 'white' : text.primary
              }}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            <p 
              className="text-xs mt-1 px-1"
              style={{ color: text.muted }}
            >
              {message.sender} · {message.timestamp}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4"
        style={{ borderTop: `1px solid ${border.light}` }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-lg border"
            style={{
              borderColor: border.default,
              backgroundColor: background.white,
              color: text.primary
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: inputValue.trim() ? brand.navy : background.primary,
              color: inputValue.trim() ? 'white' : text.muted,
              opacity: inputValue.trim() ? 1 : 0.5,
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}


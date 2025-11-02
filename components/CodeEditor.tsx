"use client";

import { useState, useEffect } from 'react';
import { background, text, brand, border } from '@/lib/colors';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

export default function CodeEditor({ value, onChange, language, readOnly = false }: CodeEditorProps) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineCount(lines);
  }, [value]);

  const getLanguageName = (lang: string) => {
    const names: { [key: string]: string } = {
      javascript: 'JavaScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      typescript: 'TypeScript'
    };
    return names[lang] || lang;
  };

  return (
    <div 
      className="h-full flex flex-col rounded-lg overflow-hidden border"
      style={{ borderColor: border.default }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ 
          backgroundColor: background.primary,
          borderColor: border.light
        }}
      >
        <span className="text-sm font-medium" style={{ color: text.secondary }}>
          {getLanguageName(language)}
        </span>
        <span className="text-xs" style={{ color: text.muted }}>
          {lineCount} lines
        </span>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#1e1e1e' }}>
        {/* Line Numbers */}
        <div 
          className="flex-shrink-0 px-3 py-4 select-none overflow-hidden text-right"
          style={{ 
            backgroundColor: '#252526',
            color: '#858585',
            fontSize: '14px',
            fontFamily: 'monospace',
            lineHeight: '1.5'
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 px-4 py-4 resize-none outline-none"
          style={{
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            fontSize: '14px',
            fontFamily: 'monospace',
            lineHeight: '1.5',
            tabSize: 4
          }}
          onKeyDown={(e) => {
            // Handle Tab key
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newValue = value.substring(0, start) + '    ' + value.substring(end);
              onChange(newValue);
              
              // Set cursor position after tab
              setTimeout(() => {
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
              }, 0);
            }
          }}
        />
      </div>
    </div>
  );
}


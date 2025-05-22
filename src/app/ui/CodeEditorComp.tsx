'use client';

import { useState, useEffect, TextareaHTMLAttributes } from 'react';
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useNote } from '@/hooks/useNote';

interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement>  {
  currentValue: string;
  language: string;
  placeholder?: string;
  className?: string;
}

export function CodeEditorComp({
  currentValue= "",
  language,
  placeholder = 'Escribe tu código aquí...',
  className = ''
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const {code, setCode} = useNote()

  // Evitar hidratación en el servidor
  useEffect(() => {
    setMounted(true);
    if(!currentValue) {
      setCode('');
    }
  }, [currentValue, setCode]);


  if (!mounted) {
    return (
      <div className={`bg-[#1e1e1e] p-4 rounded-md ${className}`}>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Cargando editor...
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#1e1e1e] p-4 rounded-md h-auto ${className}`}>
      <CodeEditor
        value={code}
        language={language}
        placeholder={placeholder}
        onChange={(evn) => setCode(evn.target.value)}
        padding={0}
        minHeight={100}
        style={{
          fontSize: '14px',
          backgroundColor: "#1e1e1e",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  );
}

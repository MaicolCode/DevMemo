'use client';

import { useState, useEffect, TextareaHTMLAttributes } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';
import { useNote } from '@/hooks/useNote';

interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement>  {
  currentValue: string;
  language: string;
  placeholder?: string;
  className?: string;
}

export function CodeEditor({
  currentValue="",
  language,
  placeholder = 'Escribe tu código aquí...',
  className = ''
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const {code, setCode} = useNote()

  // Evitar hidratación en el servidor
  useEffect(() => {
    setMounted(true);
  }, []);

  // Función para resaltar la sintaxis
  const highlightWithLineNumbers = (code: string) => {
    return highlight(code, languages[language] || languages.javascript, language)
  };

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
    < >
      <Editor
        value={currentValue ?? code}
        onValueChange={(code) => setCode(code)}
        highlight={highlightWithLineNumbers}
        padding={10}
        placeholder={placeholder}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#1e1e1e',
          minHeight: '200px',
        }}
        textareaClassName="focus:outline-none text-white"
        preClassName="m-0 p-0"
      />
    </>
  );
}

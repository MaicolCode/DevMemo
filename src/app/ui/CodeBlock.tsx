'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Highlight the code
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre className="rounded-lg overflow-hidden">
      <code
        ref={codeRef}
        className={`hljs ${language} text-sm`}        
      >
        {code}
      </code>
    </pre>
  );
}

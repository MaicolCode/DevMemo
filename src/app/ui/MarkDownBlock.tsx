import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'
import rehypeRaw from 'rehype-raw'

interface MarkDownSectionProps {
  explanation: string;
  language: string;
}

export default function MarkDownBlock({ explanation, language }: MarkDownSectionProps) {
  return (
    <ReactMarkdown
     rehypePlugins={[rehypeRaw]}
    components={{
        h1: ({ children, ...props }) => (
          <h1 className="text-2xl font-bold text-gray-100 my-4" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="text-xl font-bold text-gray-100 my-4" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="text-lg font-medium text-gray-100 my-4" {...props}>
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p className="text-gray-300 my-4" {...props}>
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-disc list-inside text-gray-300 my-4" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="list-decimal list-inside text-gray-300 my-4" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="my-2 mx-4" {...props}>
            {children}
          </li>
        ),
        a: ({ children, ...props }) => (
          <a className="text-blue-500 hover:text-blue-600 my-4" {...props}>{children}</a>
        )
        ,
        blockquote: ({ children, ...props }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 my-4" {...props}>
            {children}
          </blockquote>),

        code: ({ children, ...props }) => (
          <CodeBlock
            code={String(children)}
            language={language?.toLowerCase() || 'plaintext'}
            {...props}
          />
        ),
      }}
    >
      {explanation}
    </ReactMarkdown>
  )
}
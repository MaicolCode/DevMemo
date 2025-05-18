"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetNote } from "@/hooks/useNote";
import { CodeBlock } from "@/components/CodeBlock";
import { deleteNote } from "@/lib/actions_test";
import { useUser } from "@clerk/nextjs";



export default function NoteDetail() {
  const params = useParams<{ noteId: string }>();
  const { note, loading, error } = useGetNote(params.noteId);
  const {user} = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">{error}</div>
        <Link
          href="/dashboard"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Volver al dashboard
        </Link>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Link
          href="/dashboard"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-2xl font-semibold">{note.title}</h2>
      </div>

      <Link href="/dashboard" onClick={() => deleteNote(note.id, user?.id as string)}>Elminar</Link>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(note.created_at).toLocaleDateString()}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {note.language || 'Sin lenguaje'}
          </span>
        </div>

        <CodeBlock 
            code={note.code} 
            language={note.language?.toLowerCase() || 'plaintext'}
          />

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold my-4">Explicación:</h2>
          <p>{note.explanation}</p>
        {note.solution && <div>
          <h2 className="text-xl font-semibold my-4">Solución:</h2>
          <p>{note.solution}</p>
          </div>}
        </div>
      </div>
    </div>
  );
}
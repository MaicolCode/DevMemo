"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetNote } from "@/hooks/useNote";
import { CodeBlock } from "@/app/ui/CodeBlock";
import { useNote } from "@/hooks/useNote";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Note } from "@/types";



export default function NoteDetail() {
  const router = useRouter();
  const params = useParams<{ noteId: string }>();
  const { note, loading, error } = useGetNote(params.noteId);
  const {deleteNotes} = useNote();

  const handleDelete = async (note: Note) => {
    try {
      await deleteNotes(note.id)
      router.push('/dashboard');
      toast.success('Nota eliminada exitosamente');
    } catch (e) {
      console.error(e);
      toast.error('Error al eliminar la nota');    
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-md h-12 w-12 border-2 border-[#2a2a2a]"></div>
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-[#2a2a2a]"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-medium text-gray-100">{note.title}</h2>
        </div>
        <div className="flex space-x-3">
          <Link 
            href={`/dashboard/${note.id}/edit`}
            className="text-sm px-4 py-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded-lg transition-colors duration-200"
          >
            Editar
          </Link>
          <button 
            onClick={() => {
              handleDelete(note)
            }}
            className="text-sm px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded-lg transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">
            Creada el {new Date(note.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="bg-[#2d2d2d] text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
            {note.language || 'Sin lenguaje'}
          </span>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#2a2a2a]">
          <CodeBlock 
            code={note.code} 
            language={note.language?.toLowerCase() || 'plaintext'}
          />
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#2d2d2d] text-gray-300 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2a2a2a]">
          <h2 className="text-lg font-medium text-gray-100 mb-4">Explicación</h2>
          <p className="text-gray-300 whitespace-pre-line">{note.explanation}</p>
        </div>

        {note.solution && (
          <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2a2a2a]">
            <h2 className="text-lg font-medium text-gray-100 mb-4">Solución</h2>
            <p className="text-gray-300 whitespace-pre-line">{note.solution}</p>
          </div>
        )}
      </div>
    </div>
  );
}
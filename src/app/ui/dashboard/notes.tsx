'use client'

import { Note } from "@/types";
import { useNote } from "@/hooks/useNote";
import NoteCard from "@/components/NoteCard";
import ErrorMessage from "@/components/Messages/Error";

export default function Notes() {
    const { notes, error, loading } = useNote();

    return (
        <div className="w-full md:w-[350px] lg:w-[400px] border-r border-[#2a2a2a] p-4 overflow-y-auto">
            {loading && (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-md h-12 w-12 border-2 border-[#2a2a2a]"></div>
                </div>
            )}
            {error && (
                <ErrorMessage message={`Error al cargar notas: ${error.message}`} />
            )}

            {!notes || notes.length === 0 ? (
                <div className="text-gray-400 text-center py-12 px-4">
                    <p className="mb-2">No hay notas aún</p>
                    <p className="text-xs text-gray-500">Crea tu primera nota haciendo clic en el botón superior</p>
                </div>
            ) : (
                <div className="space-y-3 pr-2">
                    {notes.map((nota: Note) => (
                        <NoteCard key={nota.id} nota={nota} />
                    ))}
                </div>
            )}
        </div>

    );
}
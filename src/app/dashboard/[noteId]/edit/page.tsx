"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { languages } from '@/lib/constants';
import { useGetNote, useNote, useUpdateNote } from '@/hooks/useNote';
import FormInput from '@/app/ui/FormInput';
import FormTextArea from '@/app/ui/FormTextArea';
import { CodeEditorComp } from '@/app/ui/CodeEditorComp';

export default function EditNotePage() {
    const router = useRouter();
    const params = useParams<{ noteId: string }>();
    const noteId = params.noteId;

    const { isLoaded, userId } = useAuth();
    const { note, loading: isLoadingNote, error: noteError } = useGetNote(noteId);
    const {
        updatedNote,
        newNote,
        loading: isUpdating,
        error: updateError,
        setNewNote
    } = useUpdateNote(noteId);

    const { code, setCode } = useNote();

    // Redirigir si el usuario no está autenticado
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push('/sign-in');
        }
    }, [isLoaded, userId, router]);

    // Actualizar el formulario cuando se cargue la nota
    useEffect(() => {
        if (note) {
            setNewNote({
                title: note.title || '',
                code: note.code || '',
                explanation: note.explanation || '',
                solution: note.solution || '',
                language: note.language || 'javascript',
                tags: note.tags?.join(', ') || ''
            });
        }

        // Actualización del estado inicial del código
        setCode(note?.code || '');
    }, [note, setNewNote, setCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newNotes = {
            ...newNote,
            [name]: value
        }
        newNotes.code = code;
        setNewNote(newNotes);
    };

    // Actualizacion del valor del codigo     
    newNote.code = code;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updatedNote();
            setCode('');
            router.push(`/dashboard/${noteId}`);
            toast.success('Nota actualizada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar la nota');
        }
    };

    if (isLoadingNote) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-md h-12 w-12 border border-[#2a2a2a]"></div>
            </div>
        );
    }


    if (noteError) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{noteError}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium text-gray-100">Editar Nota</h1>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                    ← Volver
                </button>
            </div>

            {updateError && (
                <div className="bg-red-900/30 border border-red-900/50 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
                    {updateError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                <div>
                    <FormInput
                        type="text"
                        id="title"
                        name="title"
                        label="Título"
                        onChange={handleChange}
                        defaultValue={note?.title || ''}
                        required
                        placeholder="Título de la nota"
                    />
                </div>

                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                        Lenguaje de Programación
                    </label>
                    <select
                        id="language"
                        name="language"
                        disabled
                        onChange={handleChange}
                        defaultValue={note?.language || 'javascript'}
                        className="w-full px-4 py-2 border border-[#3a3a3a] rounded-md bg-[#2c2c2c] text-gray-200 focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 ease-in"
                    >
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value} className="bg-[#2c2c2c] text-gray-200">
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Código
                    </label>
                    <CodeEditorComp
                        currentValue={note?.code || ''}
                        language={note?.language || 'javascript'}
                        placeholder="Escribe tu código aquí..."
                        className="w-full"
                    />
                </div>

                <div>
                    <FormTextArea
                        id="explanation"
                        name="explanation"
                        label="Explicación"
                        defaultValue={note?.explanation || ''}
                        onChange={handleChange}
                        required
                        rows={20}
                        placeholder="Explica el problema o concepto que aborda este código..."
                    />
                </div>

                <div>
                    <FormTextArea
                        id="solution"
                        name="solution"
                        label="Solución (Opcional)"
                        defaultValue={note?.solution || ''}
                        onChange={handleChange}
                        rows={20}
                        placeholder="Explica cómo resolver el problema o implementar la solución..."
                    />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                        Etiquetas (separadas por comas)
                    </label>
                    <FormInput
                        type="text"
                        id="tags"
                        name="tags"
                        label="Etiquetas"
                        onChange={handleChange}
                        defaultValue={note?.tags?.join(', ') || ''}
                        required
                        placeholder="ejemplo: react, hooks, typescript"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Separa las etiquetas con comas
                    </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-[#2a2a2a]">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-[#3a3a3a] rounded-md text-sm font-medium text-gray-300 bg-transparent hover:bg-[#2a2a2a] transition-colors duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2d2d2d] hover:bg-[#3a3a3a] border border-[#3a3a3a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}

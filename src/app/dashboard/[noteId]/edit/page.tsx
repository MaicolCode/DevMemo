"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { languages } from '@/lib/constants';
import { useGetNote, useUpdateNote } from '@/hooks/useNote';

export default function EditNotePage() {
    const router = useRouter();
    const params = useParams<{ noteId: string }>();
    const noteId = params.noteId;
    
    const { isLoaded, userId } = useAuth();
    const { note, loading: isLoadingNote, error: noteError } = useGetNote(noteId);
    const { 
        updatedNote, 
        loading: isUpdating, 
        error: updateError, 
        setNewNote 
    } = useUpdateNote(noteId);

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
    }, [note, setNewNote]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewNote(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await updatedNote();
            toast.success('Nota actualizada exitosamente');
            router.push(`/dashboard/${noteId}`);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar la nota');
        }
    };

    if (isLoadingNote) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Editar Nota</h1>
            
            {updateError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{updateError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        defaultValue={note?.title || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Lenguaje de Programación
                    </label>
                    <select
                        id="language"
                        name="language"
                        onChange={handleChange}
                        defaultValue={note?.language || 'javascript'}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    >
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Código
                    </label>
                    <textarea
                        id="code"
                        name="code"
                        rows={10}
                        onChange={handleChange}
                        defaultValue={note?.code || ''}
                        className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">
                        Explicación
                    </label>
                    <textarea
                        id="explanation"
                        name="explanation"
                        rows={5}
                        onChange={handleChange}
                        defaultValue={note?.explanation || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                </div>

                <div>
                    <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                        Solución
                    </label>
                    <textarea
                        id="solution"
                        name="solution"
                        rows={5}
                        onChange={handleChange}
                        defaultValue={note?.solution || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Etiquetas (separadas por comas)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        onChange={handleChange}
                        defaultValue={note?.tags?.join(', ') || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        placeholder="ejemplo: react, hooks, typescript"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}

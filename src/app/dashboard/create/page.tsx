"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { languages } from '@/lib/constants';
import useCreateNote from '@/hooks/useNote';



export default function CreateNotePage() {
    const router = useRouter();
    const { isLoaded, userId } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {formNote, setFormNote, postNote} = useCreateNote();

    // Redirigir si el usuario no está autenticado
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push('/sign-in');
        }
    }, [isLoaded, userId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormNote(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(formNote)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await postNote();

            toast.success('Nota creada exitosamente');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar la nota');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Nueva Nota de Código</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formNote.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Ej: Manejo de Promesas en JavaScript"
                    />
                </div>

                {/* Lenguaje */}
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lenguaje de Programación
                    </label>
                    <select
                        id="language"
                        name="language"
                        value={formNote.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Código */}
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Código
                    </label>
                    <textarea
                        id="code"
                        name="code"
                        value={formNote.code}
                        onChange={handleChange}
                        required
                        rows={10}
                        className="w-full px-4 py-2 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Pega tu código aquí..."
                    />
                </div>

                {/* Explicación */}
                <div>
                    <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Explicación
                    </label>
                    <textarea
                        id="explanation"
                        name="explanation"
                        value={formNote.explanation}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Explica el problema o concepto que aborda este código..."
                    />
                </div>

                {/* Solución */}
                <div>
                    <label htmlFor="solution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Solución
                    </label>
                    <textarea
                        id="solution"
                        name="solution"
                        value={formNote.solution}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Describe la solución o los puntos clave del código..."
                    />
                </div>

                {/* Etiquetas */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Etiquetas (separadas por comas)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formNote.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="javascript, react, hooks, ..."
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Usa etiquetas para organizar y encontrar fácilmente tus notas.
                    </p>
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard')}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Nota'}
                    </button>
                </div>
            </form>
        </div>
    );
}
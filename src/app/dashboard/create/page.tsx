"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { FormData } from '@/types';
import { toast } from 'react-hot-toast';
import { languages } from '@/lib/constants';
import {useNote} from '@/hooks/useNote';
import FormInput from '@/app/ui/FormInput';
import { CodeEditorComp } from '@/app/ui/CodeEditorComp';
import FormTextArea from '@/app/ui/FormTextArea';



export default function CreateNotePage() {
    const router = useRouter();
    const { isLoaded, userId } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {formNote, setFormNote, createNote} = useNote();
    const {code, setCode} = useNote();

    // Redirigir si el usuario no está autenticado
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push('/sign-in');
        }
    }, [isLoaded, userId, router]);

    useEffect(() => {
        setCode('');
    }, [setCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFormData: FormData = {
            ...formNote,
            code,
            [name]: value
        };
        setFormNote(newFormData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createNote();
            // Limpiar el formulario
            const clearForm = () => {
                setFormNote({
                    title: '',
                    code: '',
                    explanation: '',
                    solution: '',
                    language: 'javascript',
                    tags: ''
                });
            };
            clearForm();
            
        setCode('')

            router.push('/dashboard');
            toast.success('Nota creada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar la nota');
        } finally {
            setIsSubmitting(false);
            router.push('/dashboard');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-medium mb-6">Nueva Nota de Código</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                {/* Título */}
                <div>
                    <FormInput
                        type="text"
                        id="title"
                        name="title"
                        label='Título'
                        value={formNote.title}
                        onChange={handleChange}
                        required
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
                        className="w-full px-4 py-2 border border-[#535353c7] rounded-md bg-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 ease-in"
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
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Código
                        </label>
                        <CodeEditorComp
                            currentValue={code}
                            language={formNote.language}
                            placeholder="Escribe tu código aquí..."
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Explicación */}
                <div>
                    <FormTextArea
                        id="explanation"
                        name="explanation"
                        label="Explicación"
                        value={formNote.explanation}
                        onChange={handleChange}
                        required
                        rows={4}
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
                        className="w-full px-4 py-2 border border-[#535353c7] rounded-md bg-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 ease-in"
                        placeholder="Describe la solución o los puntos clave del código..."
                    />
                </div>

                {/* Etiquetas */}
                <div>
                    <FormInput
                        type="text"
                        id="tags"
                        name="tags"
                        label="Etiquetas"
                        value={formNote.tags}
                        onChange={handleChange}
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
                        className="px-5 py-2 border border-[#535353c7] rounded-lg text-sm hover:bg-[#5353531a] transition-all duration-200 ease-in"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 border border-[#535353c7] bg-[#535353c7] text-white rounded-lg text-sm hover:bg-[#585858c7] transition-all duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Nota'}
                    </button>
                </div>
            </form>
        </div>
    );
}
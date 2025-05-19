"use client"

import { createContext, useEffect, useState, useCallback } from "react";
import { deleteNote, getNotes, postNote } from "@/lib/actions";
import { FormData, Note } from '@/types';

import { useUser } from "@clerk/nextjs";

const noteEx = {
    title: '',
    code: '',
    explanation: '',
    solution: '',
    language: 'javascript',
    tags: ''
  }

interface NotesContextType {
    notes: Note[];
    error: { message: string } | null;
    createNote: () => Promise<void>;
    deleteNotes: (id: string) => Promise<void>;
    formNote: FormData;
    setFormNote: (note: FormData) => void;
}

export const notesContext = createContext<NotesContextType>({
    notes: [],
    error: null,
    createNote: async () => {},
    deleteNotes: async () => {},
    formNote: noteEx,
    setFormNote: () => { return noteEx}
});

export const NotesProvider = ({children}: {children: React.ReactNode}) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState<{message: string} | null>(null);
    const [formNote, setFormNote] = useState<FormData>(noteEx);
    const { user } = useUser();
    const id = user?.id;

    const fetchNotes = useCallback(async () => {
        const { data, error } = await getNotes();
        const filteredNotes = data.filter((note: Note) => note.user_id === id);
        setNotes(filteredNotes);
        setError(error);
    }, [id, setError]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const createNote = useCallback(async () => {
        try {
            await postNote(formNote, id as string);
            await fetchNotes();
        } catch (error) {
            setError({ message: 'Error al crear la nota' + error });
        }
    }, [id, fetchNotes, setError, formNote]);

    const deleteNotes = useCallback(async (noteId: string) => {
        try {
            await deleteNote(noteId, id as string);
            await fetchNotes();
        } catch (error) {
            setError({ message: 'Error al eliminar la nota' + error });
        }
    }, [fetchNotes, setError, id]);

    return (
        <notesContext.Provider value={{ notes, error: error || null, createNote, deleteNotes, formNote, setFormNote: setFormNote }}>
            {children}
        </notesContext.Provider>
    );
};
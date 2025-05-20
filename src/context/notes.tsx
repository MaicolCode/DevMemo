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
    filterNotes: Note[];
    error: { message: string } | null;
    createNote: () => Promise<void>;
    deleteNotes: (id: string) => Promise<void>;
    searchNote: (search: string) => void;
    formNote: FormData;
    setFormNote: (note: FormData) => void;
    loading: boolean;
}

export const notesContext = createContext<NotesContextType>({
    notes: [],
    filterNotes: [],
    error: null,
    createNote: async () => {},
    deleteNotes: async () => {},
    searchNote: () => {},
    formNote: noteEx,
    setFormNote: () => { return noteEx},
    loading: false
});

export const NotesProvider = ({children}: {children: React.ReactNode}) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filterNotes, setFilterNotes] = useState<Note[]>([]);
    const [error, setError] = useState<{message: string} | null>(null);
    const [formNote, setFormNote] = useState<FormData>(noteEx);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const id = user?.id;

    const searchNote = (search: string) => {
        const filteredNotes = notes.filter((note: Note) => note.title.toLowerCase().includes(search.toLowerCase()));
        setFilterNotes(filteredNotes);
    }

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        const { data, error } = await getNotes();
        const filteredNotes = data.filter((note: Note) => note.user_id === id);
        setNotes(filteredNotes);
        setFilterNotes(filteredNotes);
        setError(error);
        setLoading(false);
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
        <notesContext.Provider value={{ notes, filterNotes, error: error || null, createNote, deleteNotes, searchNote, formNote, setFormNote: setFormNote, loading }}>
            {children}
        </notesContext.Provider>
    );
};
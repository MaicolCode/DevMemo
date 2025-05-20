import { useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FormData, Note } from '@/types';
import { updateNote } from '@/lib/actions';
import { notesContext } from '@/context/notes';

export interface UseNoteResult {
  note: Note | null;
  loading: boolean;
  error: string | null;
}

export function useNote() {
  const {notes, filterNotes, error, deleteNotes, searchNote, formNote, setFormNote, createNote, loading } = useContext(notesContext);

  return { notes, filterNotes, error, deleteNotes, searchNote, formNote, setFormNote, createNote, loading };
}

export function useGetNote(noteId: string): UseNoteResult {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const id = user?.id;

  useEffect(() => {
    const fetchGetNote = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('No autorizado');
        }

        const response = await fetch(`https://devmemo.vercel.app/api/notes/${noteId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al obtener la nota');
        }

        const data = await response.json();
        setNote(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la nota');
      } finally {
        setLoading(false);
      }
    };

    fetchGetNote();
  }, [id, noteId]);

  return { note, loading, error };
}

export function useUpdateNote(noteId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState<FormData>({
    title: '',
    code: '',
    explanation: '',
    solution: '',
    language: 'javascript',
    tags: ''
  });

  const { user } = useUser();
  const id = user?.id;

  const updatedNote = async () => {
    try {
      setLoading(true);
      const response = await updateNote(noteId, newNote, id as string);
      console.log(response)

      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar la nota');
    } finally {
      setLoading(false);
    }
  }

  return { updatedNote, loading, error, setNewNote };
}

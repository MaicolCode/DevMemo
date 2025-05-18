import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Note } from '@/types';
import { getNotes } from '@/lib/actions';

export interface UseNoteResult {
  note: Note | null;
  loading: boolean;
  error: string | null;
}

export function useNote() {
  const {user} = useUser();
  const id = user?.id;
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [error, setError] = useState<{message: string} | null>(null);

  useEffect(() => {
    const fethNote = async () => {
      try {
        const {data, error} = await getNotes();
        const notes = data.filter(note => note.user_id === id);

        
        setNotes(notes);
        setError(error);
      } catch (err) {
        setError(err instanceof Error ? {message: err.message} : {message: 'Error al cargar la nota'});
      }
    }

    fethNote();
  }, [id]);

  return {notes, error};
}

export function useGetNote(noteId: string): UseNoteResult {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useUser();
  const id = user?.id;

  useEffect(() => {
    const fetchGetNote = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('No autorizado');
        }

        const response = await fetch(`http://localhost:3000/api/notes/${noteId}`);

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

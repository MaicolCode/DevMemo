import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Note } from '@/types';

export interface UseNoteResult {
  note: Note | null;
  loading: boolean;
  error: string | null;
}

export function useNote(noteId: string): UseNoteResult {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          throw new Error('No autorizado');
        }

        const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

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

    fetchNote();
  }, [noteId, getToken]);

  return { note, loading, error };
}

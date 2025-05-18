import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FormData, Note } from '@/types';
import { getNotes, updateNote } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export interface UseNoteResult {
  note: Note | null;
  loading: boolean;
  error: string | null;
}

export function useNote() {
  const { user } = useUser();
  const id = user?.id;
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const fethNote = async () => {
      try {
        const { data, error } = await getNotes();
        const notes = data.filter((note: Note) => note.user_id === id);


        setNotes(notes);
        setError(error);
      } catch (err) {
        setError(err instanceof Error ? { message: err.message } : { message: 'Error al cargar la nota' });
      }
    }

    fethNote();
  }, [id]);

  return { notes, error };
}

export default function useCreateNote() {
  const [formNote, setFormNote] = useState<FormData>({
    title: '',
    code: '',
    explanation: '',
    solution: '',
    language: 'javascript',
    tags: ''
  });
  const { user } = useUser();
  const router = useRouter();


  const postNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formNote,
          tags: formNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
          user_id: user?.id
        })
      })

      if (!response.ok) {
        throw new Error("Error to save note")
      }
    } catch (error) {
      console.log(error)
    }
    router.refresh();
  }

  return { formNote, setFormNote, postNote }

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

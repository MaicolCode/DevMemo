export interface Note {
    id: string;
    title: string;
    code: string;
    explanation: string;
    solution: string;
    language: string;
    tags: string[];
    created_at: string;
}

// Aquí puedes agregar más interfaces, tipos y enums que sean compartidos en toda la aplicación
// Por ejemplo:

export type NoteCategory = 'frontend' | 'backend' | 'database' | 'other';

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export type FormData = {
    title: string;
    code: string;
    explanation: string;
    solution: string;
    language: string;
    tags: string;
};

import { FormData } from "@/types";


export async function getNotes() {

    const res = await fetch("https://devmemo.vercel.app/api/notes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
    }

    return await res.json(); // Aseguramos que se resuelva la promesa de res.json()
}

export async function postNote(note: FormData, user: string) {
    const newNote = {
        ...note,
        tags: note.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    }

    const res = await fetch("https://devmemo.vercel.app/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...newNote,
          user_id: user
        })
      })

    if (!res.ok) {
        throw new Error("Error to save note")
    }

    return await res.json();
}


export async function deleteNote(id: string, user: string) {
    const res = await fetch(`https://devmemo.vercel.app/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify({user})
    })

    if(!res.ok) {
        throw new Error("Error to delete note")
    }

    return await res.json();
}

export async function updateNote(id: string, note: FormData, user:string){
    const newNote = {
        ...note,
        tags: note.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    }

    const res = await fetch(`https://devmemo.vercel.app/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify({note: newNote, user: user})
    })

    if(!res.ok) {
        throw new Error("Error to update note")
    }
}
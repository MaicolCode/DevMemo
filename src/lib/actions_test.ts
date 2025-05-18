

export async function deleteNote(id: string, user: string) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
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
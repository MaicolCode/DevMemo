

export async function getNotes() {

    const res = await fetch("http://localhost:3000/api/notes", {
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
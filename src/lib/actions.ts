export async function getNotes() {
    const res = await fetch("http://localhost:3000/api/notes",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!res.ok) throw new Error("Failed to fetch notes");

    return res.json();
}
import { auth } from "@clerk/nextjs/server";

export async function getNotes() {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error((await res.json()).error);

    return res.json();
}
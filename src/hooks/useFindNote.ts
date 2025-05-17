import { FormData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";


export default function useFindNote() {
    const {getToken} = useAuth();
    const [formNote, setFormNote] = useState<FormData>({
        title: '',
        code: '',
        explanation: '',
        solution: '',
        language: 'javascript',
        tags: ''
    });

    const postNote = async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/notes",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await getToken()}`
                },
                body: JSON.stringify({
                    ...formNote,
                    tags: formNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                })
            })

            if(!response.ok){
                throw new Error("Error to save note")
            }
        } catch (error) {
            console.log(error)               
        }
    }

    return {formNote, setFormNote, postNote}

}
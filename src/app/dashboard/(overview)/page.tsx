"use client"

import { useUser } from "@clerk/nextjs";

export default function Page() {  
    const {user} = useUser();  
    return (
        <main>
            Aqui va el contenido de los codigos guardados
            {user?.fullName}
        </main>
    )
}
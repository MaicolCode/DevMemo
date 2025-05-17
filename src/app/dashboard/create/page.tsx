import { auth } from "@clerk/nextjs/server";

export default async function DashboardDev() {
    const { userId } = await auth();
    if (!userId) (await auth()).redirectToSignIn(); 
    
    
    
    return (
        <div className="container mx-auto px-4 py-8">
            Aqui va el formulario para agregar la nota
        </div>
    );
}
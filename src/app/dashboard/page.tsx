import { auth } from "@clerk/nextjs/server";
import {getNotes} from "@/lib/actions";
import { Note } from "@/types";

export default async function DashboardDev() {
    const { userId } = await auth();
    if (!userId) (await auth()).redirectToSignIn(); 
    
    const {data: notes, error} = await getNotes();
    
    return (
        <div className="container mx-auto px-4 py-8 font-quicksand">
            <h1 className="text-3xl font-bold mb-6">Tus Notas de Código</h1>
            
            { error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    Error al cargar notas: {error.message}
                </div>
            )}

            {notes && notes.length === 0 && (
                <div className="text-gray-600 text-center py-8">
                    Aún no tienes notas de código registradas.
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes?.map((nota: Note) => (
                    <div 
                        key={nota.id} 
                        className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{nota.title}</h2>                    
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{new Date(nota.created_at).toLocaleDateString()}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {nota.language || 'Sin lenguaje'} - {nota.tags?.join(", ")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
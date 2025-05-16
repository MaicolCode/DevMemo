import { auth } from "@clerk/nextjs/server";
// import { createClient } from "@supabase/supabase-js";

/* const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
); */

export default async function DashboardDev() {
    const { userId } = await auth();

    if (!userId) (await auth()).redirectToSignIn();

    // Obtener notas del usuario
    /* const { data: notas, error } = await supabase
        .from('code_notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }); */

    return (
        <div className="container mx-auto px-4 py-8 font-quicksand">
            <h1 className="text-3xl font-bold mb-6">Tus Notas de Código</h1>
            
            {/* {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    Error al cargar notas: {error.message}
                </div>
            )}

            {notas && notas.length === 0 && (
                <div className="text-gray-600 text-center py-8">
                    Aún no tienes notas de código registradas.
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notas?.map((nota) => (
                    <div 
                        key={nota.id} 
                        className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{nota.title}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{nota.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{new Date(nota.created_at).toLocaleDateString()}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {nota.language || 'Sin lenguaje'}
                            </span>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
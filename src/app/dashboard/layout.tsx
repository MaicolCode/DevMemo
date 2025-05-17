import { auth } from "@clerk/nextjs/server";
import { getNotes } from "@/lib/actions";
import { Note } from "@/types";
import  Link  from "next/link";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth();
    if (!userId) (await auth()).redirectToSignIn();

    const { data: notes, error } = await getNotes();

    return (
        <div className="min-h-screen box-border font-questrial">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Tus Notas de Código</h1>

                <section className="flex">
                    <div className=" rounded-lg shadow-sm border border-gray-100 p-6 w-[50%]">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                Error al cargar notas: {error.message}
                            </div>
                        )}

                        {!notes || notes.length === 0 ? (
                            <div className="text-gray-600 text-center py-8">
                                Aún no tienes notas de código registradas.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notes.map((nota: Note) => (
                                    <Link href={`/dashboard/${nota.id}`}
                                        key={nota.id}
                                        className="relative block bg-white shadow-md rounded-lg px-6 py-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200 w-full"
                                    >
                                        <span className="absolute bottom-4 right-6 text-sm text-gray-500">{new Date(nota.created_at).toLocaleDateString()}</span>
                                        <h2 className="text-md font-semibold mb-2 text-gray-800 line-clamp-2">
                                            {nota.title}
                                        </h2>
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                {nota.language || 'Sin lenguaje'}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className=" rounded-lg shadow-sm border border-gray-100 p-6 h-[calc(100vh-12rem)] w-full overflow-auto">
                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}
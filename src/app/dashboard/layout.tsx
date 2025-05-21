
import ProtectedRoute from "@/app/ui/ProtectedRoute";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Notes from "@/app/ui/dashboard/Notes";
import { NotesProvider } from "@/context/notes";
import Link from "next/link";
import { Plus, SquareSquare } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await currentUser();
    return (
        <>
            <ProtectedRoute>
                <Toaster position="top-center"/>
                <header className="flex justify-end items-center py-2 px-4 gap-4 h-16 border-b border-[#2a2a2a]  font-questrial">
                    <nav className="flex items-center justify-between w-full">
                        <p className="text-sm flex items-center gap-1">
                            <SquareSquare className="w-4 h-4"/>
                            <span>{user?.fullName}</span>
                        </p>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </nav>
                </header>
                <div className="max-h-screen bg-[#0f0f0f] text-gray-200 px-4 py-6 font-questrial">
                    <div className="container mx-auto bg-[#121212] rounded-lg overflow-hidden border border-[#2a2a2a]">
                        <div className="flex justify-between items-center py-4 px-6 border-b border-[#2a2a2a] bg-[#1a1a1a]">
                            <h1 className="text-xl font-medium">Tus Notas de Código</h1>
                            <Link
                                href="/dashboard/create"
                                className="flex items-center gap-2 py-2 px-4 bg-[#2d2d2d] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded-lg text-sm transition-all duration-200 ease-in-out"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Crear Nota</span>
                            </Link>
                        </div>

                        <section className="flex flex-col md:flex-row h-[calc(100vh-12rem)]">
                            <NotesProvider>
                                <Notes />
                                <div className="flex-1 p-6 overflow-y-auto bg-[#121212]">
                                    {children}
                                </div>
                            </NotesProvider>
                        </section>

                    </div>
                </div>
            </ProtectedRoute>

        </>
    );
}
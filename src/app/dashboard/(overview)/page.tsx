"use client"

import { SquareSquare } from "lucide-react";

export default function Page() {
    return (
        <main>
            <div className="flex justify-center items-center gap-2 h-[calc(100vh-18rem)]">
                <div className="flex flex-col items-center gap-2">
                    <SquareSquare className="w-12 h-12" />
                    <h1 className="text-2xl font-bold">DevMemo</h1>
                    <p className="text-gray-400 text-center max-w-xl">Bienvenido a tu espacio de notas personal, en este espacio podras guardar tus codigos, errores y aprender de tus errores.</p>
                </div>
            </div>
        </main>
    )
}
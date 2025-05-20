import { Note } from "@/types";
import Link from "next/link";

export default function NoteCard({ nota }: { nota: Note }) {
    return (
        <Link href={`/dashboard/${nota.id}`}
            key={nota.id}
            className="relative block bg-[#1e1e1e] shadow-md rounded-lg px-6 py-4 border-l-4 border-[#3a3a3a] transition-all w-full hover:bg-[#292929] duration-200 ease-in"
        >
            <span className="absolute bottom-4 right-6 text-sm text-gray-500">{new Date(nota.created_at).toLocaleDateString()}</span>
            <h2 className="text-sm font-medium mb-2 text-gray-200 line-clamp-2 w-[20rem] overflow-ellipsis">
                {nota.title}
            </h2>
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
                    {nota.language || 'Sin lenguaje'}
                </span>
            </div>
        </Link>
    )
}
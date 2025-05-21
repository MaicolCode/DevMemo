'use client'

import { SearchIcon } from "lucide-react"
import { InputHTMLAttributes } from "react"

interface SearchComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    active?: boolean;
}

export default function SearchComponent({active,...props}: SearchComponentProps) {
    return (
        <div className={`flex items-center gap-2 border border-[#2a2a2a] rounded-lg px-2 text-sm ${!active ? 'bg-[#353535]' : ''}`}>
            <SearchIcon className="w-4 h-4" />
            <input type="text" {...props} placeholder="Buscar..." className="w-full px-1 py-2 rounded-lg focus:outline-none" />
        </div>
    )
}
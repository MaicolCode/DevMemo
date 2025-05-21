'use client'

import { Note } from "@/types";
import { useNote } from "@/hooks/useNote";
import NoteCard from "@/app/ui/NoteCard";
import ErrorMessage from "@/app/ui/Messages/Error";
import SearchComponent from "../SearchComponent";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    y: 40,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const emptyStateVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Notes() {
    const { notes, filterNotes, error, searchNote } = useNote();
    const [textFilter, setTextFilter] = useState('');
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchNote(e.target.value);
        setTextFilter(e.target.value);
    }

    return (
        <motion.div 
            className="w-full md:w-[350px] lg:w-[400px] border-r border-[#2a2a2a] p-4 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <SearchComponent onChange={handleSearch} disabled={notes.length === 0} active={notes.length > 0}/>
            <div className="h-auto mt-5"> 
                
                {error && (
                    <ErrorMessage message={`Error al cargar notas: ${error.message}`} />
                )}

                <AnimatePresence>
                    {
                        (filterNotes.length === 0 && textFilter.length > 0) &&(
                            <motion.div
                                className="text-gray-400 text-center py-12 px-4"
                                initial="hidden"    
                                animate="visible"
                                exit="hidden"
                                variants={emptyStateVariants}
                            >
                                <p className="mb-2">Según los parametros de tu busqueda</p>
                                <p className="text-xs text-gray-500">No se encontraron notas</p>
                            </motion.div>)
                    }
                </AnimatePresence>

                {!notes || notes.length === 0 ? (
                    <motion.div
                        className="text-gray-400 text-center py-12 px-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={emptyStateVariants}
                    >
                        <p className="mb-2">No hay notas aún</p>
                        <p className="text-xs text-gray-500">Crea tu primera nota</p>
                    </motion.div>
                ) : (
                    <motion.div
                        className="space-y-3 pr-2"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <AnimatePresence mode="popLayout">
                            {filterNotes.map((nota: Note) => (
                                <motion.div
                                    key={nota.id}
                                    layout
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    <NoteCard nota={nota} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

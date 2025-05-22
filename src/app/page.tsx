"use client"

import { SignedIn, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { SquareSquare, Code, Search, Tag, Bug, Book, Clock, Rocket, Shield, Target, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {

  const clerk = useClerk();
  const { user } = useUser();


  return (

    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a] z-50 font-questrial">
        <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-full">
          <p className="flex items-center gap-2 text-gray-200">
            <SquareSquare />
            <span className="text-xl font-bold">DevMemo</span>
          </p>
          <nav className="flex items-center gap-4">
            {!user && <><button onClick={() => clerk.openSignIn()} className="px-3 py-1 text-sm rounded-lg bg-red-900 hover:bg-red-800  border border-red-800  hover:border-red-900 text-gray-200 transition-all duration-200 ease-in">Iniciar Sesion</button>

              <button onClick={() => clerk.openSignUp()} className="px-3 py-1 text-sm rounded-lg border border-[#2a2a2a] text-gray-200 hover:border-[#3b3b3b] transition-all duration-200 ease-in">Registrarse</button></>}
            <SignedIn>
              <Link href="/dashboard" className="text-gray-200 text-sm px-2 py-1 rounded-lg bg-red-900 hover:bg-red-800 hover:border-red-800 border border-red-800 transition-all duration-200 ease-in">Dashboard</Link>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="font-questrial min-h-screen p-6">
        <div className="mx-auto sm:px-4 pt-16 sm:pt-32 flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {/* Hero Section */}
          <section className="flex flex-col justify-center items-center md:flex-row gap-6 w-full my-20">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="text-4xl md:text-5xl max-w-xl font-bold leading-tight text-gray-200 mb-4">
                Transforma tu flujo de desarrollo
              </h1>
              <p className="text-md md:text-lg text-gray-400 max-w-xl">
                DevMemo te ayuda a organizar y acceder a tu conocimiento de desarrollo de manera instantánea, lo que te vuelve más productivo y eficiente.
              </p>
              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:max-w-md my-4 sm:my-5 md:my-10">
                {!user && <button onClick={() => clerk.openSignIn()} className="w-auto px-8 py-3 rounded-lg border border-[#1f1f1f] bg-[#2d2d2d] hover:bg-[#303030] hover:border-[#474747] text-gray-200 transition-all duration-200 ease-in">
                  Comenzar
                </button>}
              </div>
            </div>
            <div className="flex items-center justify-center p-4 sm:p-6 md:p-10 rounded-md w-full md:w-[50%] bg-gradient-to-r from-zinc-900 to-zinc-700">
              <Image src="/hero.PNG" alt="hero image to devmemo" className="hover:scale-105 transition-all duration-500 ease-in-out" width={500} height={500} />
            </div>

          </section>

          <section className="flex flex-col-reverse justify-center items-center sm:flex-row gap-4 w-full h-full my-20">

            <div className="flex items-center justify-center p-4 sm:p-6 md:p-10 rounded-md w-full md:w-[50%] my-8 sm:my-10 md:my-0 bg-gradient-to-r from-zinc-900 to-zinc-700">
              <Image src="/hero-notes.PNG" alt="hero image to devmemo" className="hover:scale-105 transition-all duration-500 ease-in-out" width={500} height={500} />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <h2 className="text-4xl md:text-5xl max-w-xl font-bold leading-tight text-gray-200 mb-4">DevMemo herramienta para almacenar tu conocimiento</h2>
              <p className="text-md md:text-lg text-gray-400 max-w-xl">DevMemo es una herramienta de registro y organización que te permite mantener un historial detallado de tus códigos y errores generados en tu proceso de desarrollo de software. Con ella, podrás acceder rápidamente a tus registros, crear notas del código utilizado o del error en cuestión, anotar tus propias conclusiones y soluciones, y así agilizar tu proceso de desarrollo. De esta manera, podrás aprovechar al máximo tu conocimiento y experiencia para abordar nuevos proyectos con mayor eficiencia y confianza.</p>
            </div>

          </section>

          <section className="my-8 sm:my-10 md:my-20">
            <h2 className="text-4xl md:text-5xl max-w-xl font-bold leading-tight text-gray-200 mb-4">Las notas que tengas en mente</h2>
            <div className="max-w-4xl w-full grid md:grid-cols-3 grid-cols-1 gap-4 ">
              <div className="relative flex flex-col justify-center h-[250px] z-10 overflow-hidden bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-all duration-200 ease-in">
                <h2 className="text-xl md:text-2xl max-w-xl font-bold leading-tight text-gray-200 mb-4">Crealas</h2>
                <p className="text-gray-400 text-sm max-w-xl">Haz un registro de los códigos y errores generados en tu proceso de desarrollo de software.</p>
                <Image src="/create-note.PNG" alt="hero image to devmemo" className="absolute w-full h-full object-cover rounded-md top-0 left-0 -z-10 opacity-20" width={300} height={300} />
              </div>
              <div className="relative flex flex-col justify-center h-[250px] z-10 overflow-hidden bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-all duration-200 ease-in">
                <h2 className="text-xl md:text-2xl max-w-xl font-bold leading-tight text-gray-200 mb-4">Editalas</h2>
                <p className="text-gray-400 text-sm max-w-xl">Haz una edición de las notas con la nueva información que encontraste o descubriste.</p>
                <Image src="/edit-note.PNG" alt="hero image to devmemo" className="absolute w-full h-full object-cover rounded-md top-0 left-0 -z-10 opacity-20" width={300} height={300} />
              </div>
              <div className="relative flex flex-col justify-center h-[250px] z-10 overflow-hidden bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-all duration-200 ease-in">
                <h2 className="text-xl md:text-2xl max-w-xl font-bold leading-tight text-gray-200 mb-4">Eliminalas</h2>
                <p className="text-gray-400 text-sm max-w-xl">Si ya no necesitas de tus notas, puedes eliminarlas en cualquier momento.</p>
                <Image src="/delete-note.PNG" alt="hero image to devmemo" className="absolute w-full h-full object-cover rounded-md top-0 left-0 -z-10 opacity-20" width={300} height={300} />
              </div>
            </div>
          </section>



          {/* Features Grid */}
          <section className="max-w-5xl w-full text-sm sm:text-base my-20">
            <h2 className="text-4xl md:text-5xl max-w-xl font-bold leading-tight text-gray-200 my-10">Características</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Codigo Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-colors duration-200 ease-in">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Código Inteligente
                </h2>
                <p className="text-gray-400 mb-4">
                  Organiza y accede a tu código de manera eficiente con categorías y etiquetas personalizadas.
                </p>
                <ul className="space-y-2 text-gray-200 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-200" />
                    Almacenamiento de snippets
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-200" />
                    Búsqueda inteligente
                  </li>
                  <li className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-200" />
                    Sistema de etiquetas
                  </li>
                </ul>
              </div>

              {/* Errores Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-colors duration-200 ease-in">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Manejo de Errores
                </h2>
                <p className="text-gray-400 mb-4">
                  Documenta y aprende de tus errores para mejorar continuamente.
                </p>
                <ul className="space-y-2 text-gray-200 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-gray-200" />
                    Registro de errores
                  </li>
                  <li className="flex items-center gap-2">
                    <Book className="w-4 h-4 text-gray-200" />
                    Soluciones documentadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-200" />
                    Patrones de solución
                  </li>
                </ul>
              </div>

              {/* Ventajas Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-colors duration-200 ease-in">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Ventajas
                </h2>
                <p className="text-gray-400 mb-4">
                  Mejora tu productividad y eficiencia como desarrollador.
                </p>
                <ul className="space-y-2 text-gray-200 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-gray-200" />
                    Acceso rápido
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-200" />
                    Organización efectiva
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-200" />
                    Ahorro de tiempo
                  </li>
                </ul>
              </div>

              {/* Desventajas Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-colors duration-200 ease-in">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Desafíos
                </h2>
                <p className="text-gray-400 mb-4">
                  Desafíos comunes y cómo superarlos.
                </p>
                <ul className="space-y-2 text-gray-200 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-200" />
                    Curva de aprendizaje
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-200" />
                    Mantenimiento
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-200" />
                    Mejora continua
                  </li>
                </ul>
              </div>

              {/* Objetivos Card */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#3b3b3b] hover:bg-[#1f1f1f] transition-colors duration-200 ease-in">
                <h2 className="text-xl font-bold text-gray-200 mb-4">
                  Objetivos de Aprendizaje
                </h2>
                <p className="text-gray-400 mb-4">
                  Aprende y mejora constantemente con DevMemo.
                </p>
                <ul className="space-y-2 text-gray-200 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-200" />
                    Mejorar habilidades
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-200" />
                    Documentación
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-200" />
                    Mejora continua
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="flex flex-col p-2 items-center justify-center h-[calc(100vh-16rem)] bg-[#1a1a1a] w-full bg-gradient-to-tr from-stone-700 to-zinc-900">
            <h2 className="text-3xl md:text-5xl max-w-xl font-bold leading-tight text-gray-200 mb-4">Próximamente</h2>
            <p className="text-gray-300 md:text-sm text-xs max-w-xl text-center">
              A futuro, DevMemo podrá ofrecerte un mejor filtrado de tus notas, compartir tus notas con
              otros usuarios y mucho más.
            </p>
          </section>


        </div>

      </main>
      {/* Footer */}
      <footer className="w-full bg-[#1a1a1a] border-t border-[#2a2a2a] font-questrial mt-10 flex justify-center">
        <div className="container mt-auto sm:px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-gray-200">
              <SquareSquare />
              <span className="text-xl font-bold">DevMemo</span>
            </p>
            <p className="text-gray-400 text-sm">Desarrollado por @MaicolCode</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/MaicolCode/DevMemo" target="_blank">
              <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle fill-white hover:fill-[#c0c0c0] transition-all duration-200 ease-in">
                <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </>

  );
}

"use client"

import { SignedIn, UserButton, useClerk, useUser } from "@clerk/nextjs";
import {
  SquareSquare,
  Code,
  Search,
  Tag,
  Bug,
  Book,
  Clock,
  Rocket,
  Shield,
  Target,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  const clerk = useClerk();
  const { user } = useUser();

  return (

    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl h-16 glass rounded-2xl z-50 font-questrial px-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <SquareSquare className="text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">DevMemo</span>
        </div>

        <nav className="flex items-center gap-6">
          {!user && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => clerk.openSignIn()}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => clerk.openSignUp()}
                className="px-5 py-2 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                Get Started
              </button>
            </div>
          )}
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <div className="pl-4 border-l border-white/10">
              <UserButton />
            </div>
          </SignedIn>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="font-questrial min-h-screen bg-background text-foreground overflow-hidden">
        {/* Background Decor */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          {/* Hero Section */}
          <section className="relative flex flex-col lg:flex-row items-center gap-16 py-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Optimiza tu Workflow
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Tu cerebro <br />
                <span className="text-gradient">fuera de tu cabeza.</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Organiza tus notas de código, soluciones a bugs y fragmentos importantes en una bóveda digital diseñada para desarrolladores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {!user && (
                  <button
                    onClick={() => clerk.openSignIn()}
                    className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group"
                  >
                    Empieza ahora
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                )}
                <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all">
                  Ver demo
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800" />
                  ))}
                </div>
                <span>Usado por +500 developers</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[80px] rounded-full" />
              <div className="relative glass rounded-3xl overflow-hidden p-2 shadow-2xl">
                <Image
                  src="/hero.PNG"
                  alt="DevMemo Interface"
                  className="rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                  width={800}
                  height={600}
                />
              </div>
            </motion.div>
          </section>

          {/* Process Section */}
          <section className="py-24 space-y-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-6"
              >
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  Tu base de conocimientos <br />
                  <span className="text-primary italic">siempre lista.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  DevMemo no es solo un bloc de notas. Es una extensión de tu flujo de trabajo diseñada para que nunca vuelvas a buscar dos veces la misma solución.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Code, title: "Centraliza tu código", desc: "Guarda snippets recurrentes y librerías propias." },
                    { icon: Bug, title: "Documenta soluciones", desc: "No vuelvas a perder tiempo en ese bug de hace 3 meses." },
                    { icon: BookOpen, title: "Crece como dev", desc: "Tus propias conclusiones son tu mejor documentación." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-200">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="relative glass rounded-3xl p-6 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Image
                    src="/hero-notes.PNG"
                    alt="Notes Management"
                    className="rounded-xl relative z-10"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary blur-[60px] opacity-20" />
                </div>
              </motion.div>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Crealas", desc: "Registra códigos y errores al instante.", img: "/create-note.PNG" },
                { title: "Editalas", desc: "Perfecciona tus notas conforme aprendes.", img: "/edit-note.PNG" },
                { title: "Eliminalas", desc: "Mantén tu espacio limpio y relevante.", img: "/delete-note.PNG" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative h-[300px] rounded-3xl overflow-hidden glass hover:border-primary/50 transition-all"
                >
                  <Image
                    src={step.img}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">Potencia tu <span className="text-gradient">eficiencia.</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto italic">Herramientas pensadas por desarrolladores para desarrolladores.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Código Inteligente",
                  desc: "Organiza y accede a tu código con un sistema de tags optimizado.",
                  items: [
                    { icon: Code, text: "Snippets listos para usar" },
                    { icon: Search, text: "Búsqueda ultra rápida" },
                    { icon: Tag, text: "Categorización lógica" }
                  ]
                },
                {
                  title: "Manejo de Errores",
                  desc: "Documenta errores críticos y sus soluciones paso a paso.",
                  items: [
                    { icon: Bug, text: "Log de incidencias" },
                    { icon: Book, text: "Base de soluciones" },
                    { icon: Clock, text: "Timeline de resolución" }
                  ]
                },
                {
                  title: "Ventajas",
                  desc: "Maximiza tu ROI de tiempo en cada proyecto.",
                  items: [
                    { icon: Rocket, text: "Productividad x10" },
                    { icon: Target, text: "Foco en lo importante" },
                    { icon: Shield, text: "Conocimiento seguro" }
                  ]
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-8 rounded-3xl hover:bg-white/[0.03] transition-all group glow-hover"
                >
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{card.desc}</p>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary p-12 text-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  ¿Listo para elevar tu <br /> desarrollo al siguiente nivel?
                </h2>
                <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
                  Únete a cientos de desarrolladores que ya están organizando su conocimiento con DevMemo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {!user && (
                    <button
                      onClick={() => clerk.openSignIn()}
                      className="px-10 py-4 rounded-2xl bg-white text-primary font-bold hover:scale-105 transition-transform"
                    >
                      Empezar gratis
                    </button>
                  )}
                  <button className="px-10 py-4 rounded-2xl bg-black/20 text-white font-bold hover:bg-black/30 transition-all border border-white/20">
                    Saber más
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Próximamente */}
          <section className="py-24 text-center space-y-8 bg-zinc-900/50 rounded-[40px] border border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-widest">
              Roadmap
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">Próximamente</h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Estamos trabajando en filtrado avanzado, colaboración en tiempo real y extensiones para tu IDE favorito.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/5 rounded-lg">
                <SquareSquare className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-lg font-bold">DevMemo</span>
            </div>
            <p className="text-gray-500 text-sm">Organiza tu conocimiento, potencia tu carrera.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-gray-500 text-sm italic">Desarrollado con ❤️ por @MaicolCode</p>
            <div className="flex gap-6">
              <Link href="https://github.com/MaicolCode/DevMemo" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <svg height="24" viewBox="0 0 24 24" width="24" className="fill-current">
                  <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>

  );
}

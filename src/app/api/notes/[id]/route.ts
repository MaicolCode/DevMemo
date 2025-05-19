// app/api/notes/[id]/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function GET(
  req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();


    console.log(id);


    // Validar el token usando Clerk
    const { userId } = await auth();

    // Aquí iría la lógica para obtener la nota de la base de datos
    // Por ejemplo:
    // const note = await prisma.note.findUnique({
    //   where: { id: params.id, userId },
    // });

    // Simulamos una nota
    const { data: note, error } = await supabase.from('code_notes').select('*').eq('id', id).eq('user_id', userId).single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error al obtener la nota:", error);
    return NextResponse.json(
      { error: "Error al obtener la nota" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const { user } = await req.json();

  /* const { userId } = await auth();

  console.log(userId) */

  const { data: note, error } = await supabase.from('code_notes').delete().eq('id', id).eq('user_id', user);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(note);
}


export async function PUT(req: Request) {
  const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
  const { note, user } = await req.json();

  const { data, error } = await supabase.from('code_notes').update(note).eq('id', id).eq('user_id', user);
  
  if (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
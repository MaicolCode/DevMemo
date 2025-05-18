// app/api/notes/[id]/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id: idNote} = await params;


    // Validar el token usando Clerk
    const { userId } = await auth();

    // Aquí iría la lógica para obtener la nota de la base de datos
    // Por ejemplo:
    // const note = await prisma.note.findUnique({
    //   where: { id: params.id, userId },
    // });

    // Simulamos una nota
    const {data: note, error} = await supabase.from('code_notes').select('*').eq('id', idNote).eq('user_id', userId).single();
    console.log(note);

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500});
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

export async function DELETE(req: Request,
  { params }: { params: { id: string} }) {
  const {id} = await params;
  console.log(id)
  const {user} = await req.json();

  /* const { userId } = await auth();

  console.log(userId) */

  const {data: note, error} = await supabase.from('code_notes').delete().eq('id', id).eq('user_id', user);
    console.log(note);

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json(note);
}

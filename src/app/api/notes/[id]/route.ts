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
    // Obtener el token del header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }


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

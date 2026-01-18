import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


// Petición get para la obtencion de la base de datos desde supabase
export async function GET() {
    const { userId } = await auth();
    // Intentar obtener los datos de la tabla
    const { data, error } = await supabase
        .from('code_notes')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Verificar si hay datos
    if (!data || data.length === 0) {
        return NextResponse.json({
            data: [],
            message: 'No notes found for this user'
        });
    }

    return NextResponse.json({ data, error: null }, { status: 200 });
}
// Petición post para la creación de una nueva nota en la base de datos desde supabase
export async function POST(req: Request) {

    const { title, code, explanation, solution, language, tags, user_id } = await req.json();


    const data = {
        title,
        code,
        explanation,
        solution,
        language,
        tags,
        user_id
    }


    const { data: note, error } = await supabase.from("code_notes").insert({
        ...data
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ note, error: null }, { status: 200 });
}

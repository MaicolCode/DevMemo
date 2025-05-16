import {NextResponse} from "next/server";
import {supabase} from "@/libs/supabase";
import {auth} from "@clerk/nextjs/server";


// Petición get para la obtencion de la base de datos desde supabase
export async function GET() {
    const {userId} = await auth();

    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {data, error} = await supabase.from("code_notes").select("*").eq("user_id", userId);

    if (error) return NextResponse.json({error: error.message}, {status: 500});

    return NextResponse.json(data);
}

// Petición post para la creación de una nueva nota en la base de datos desde supabase
export async function POST(req: Request){
    const {userId} = await auth();

    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {body} = await req.json();

    const {data, error} = await supabase.from("code_notes").insert({
        ...body,
        user_id: userId
    });

    if (error) return NextResponse.json({error: error.message}, {status: 500});

    return NextResponse.json(data);
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET (
    req: Request,
    {params}: {params: {id: string}}
) {
    try {
        const res = await fetch(`https://dummyjson.com/users/${params.id}`);
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user ID" }, { status: 500 });
        
    }
}
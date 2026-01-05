import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://reqres.in/api/users?page=1", {
      headers: {
        "x-api-key": process.env.REQRES_API_KEY!
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to fetch users" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
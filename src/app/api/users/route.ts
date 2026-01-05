import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const pages = [1, 2, 3];
    const requests = pages.map((page) =>
    
    fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          "x-api-key": process.env.REQRES_API_KEY!,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Reqres error ${res.status}`);
        }
        return res.json();
      }));

    const results = await Promise.all(requests);

    const users = results.flatMap((r) => r.data)

    return NextResponse.json({
        data:users,
        total: users.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
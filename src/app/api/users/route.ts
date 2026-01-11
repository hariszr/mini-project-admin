import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const pages = [1, 2, 3];
    const requests = pages.map((page) =>
    
    fetch(`https://6958d24e6c3282d9f1d5e2c7.mockapi.io/articles`, {
        headers: {
        //   "User-Agent": "Mozilla/5.0",
        //   "Accept": "application/json",
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
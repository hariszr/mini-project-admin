// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const body = await request.json();

//   try {
//     const body = await request.json();

//     if (!body.email || !body.password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }
    
//     const res = await fetch("https://reqres.in/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data.error || "Register failed" },
//         { status: res.status }
//       );
//     }
//     console.log("Reqres success:", data);
//     return NextResponse.json(data);

//     } catch (err) {
//     return NextResponse.json({ error: "Network error" }, { status: 500 });
//     }
// }

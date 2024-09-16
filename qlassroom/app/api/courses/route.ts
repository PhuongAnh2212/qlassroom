import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    // Get the authenticated userId
    const { userId } = auth();

    // Check if userId is null or undefined
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const { title } = await req.json();

    // Create the course record in the database
    const course = await db.course.create({
      data: {
        userId,  // userId is guaranteed to be a string here
        title,
      },
    });

    // Return the created course as a JSON response
    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

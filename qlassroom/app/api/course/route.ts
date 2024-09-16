// app/api/course/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../lib/db';

export async function GET() {
    try {
        const courses = await db.course.findMany();
        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

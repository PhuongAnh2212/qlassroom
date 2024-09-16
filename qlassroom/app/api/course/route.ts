import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const courses = await db.course.findMany();
            res.status(200).json(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

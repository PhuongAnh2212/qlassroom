import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, videoUrl, notebookUrl } = req.body;

    try {
      const newChapter = await Prisma.chapter.create({
        data: {
          title,
          description,
          videoUrl,
          notebookUrl,
          position: 0, // Or calculate the position based on existing chapters
        },
      });

      res.status(200).json(newChapter);
    } catch (error) {
      res.status(500).json({ error: "Error creating chapter" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

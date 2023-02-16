// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type postProps = {
  title: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post: postProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (!post.title.length) {
        return res.status(500).json({ error: "Title is required" });
      }
      try {
        const data: any = await prisma.post.create({
          data: {
            title: post.title,
          },
        });
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

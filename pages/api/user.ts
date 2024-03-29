// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await wait(2000);
  res.status(200).json({ name: "John Doe" });
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

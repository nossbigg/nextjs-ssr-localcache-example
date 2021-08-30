import { NextApiRequest, NextApiResponse } from "next";
import Memcached from "memcached";
const memcached = new Memcached("localhost:11211");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  memcached.flush(() => {});
  res.status(200).json({ ok: "true" });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withLogger } from "@/lib/logger";
import { NextApiRequestWithLogger } from "@/types";
import type { NextApiResponse } from "next";

type Data = {
  name: string;
};

export default withLogger(function handler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse<Data>
) {
  req.log.info("Test");
  res.status(200).json({ name: "John Doe" });
});

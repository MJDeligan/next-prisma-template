import { withAuthenticationRequired } from "@/lib/serverAuth";
import { NextApiRequestWithLogger } from "@/types";
import type { NextApiResponse } from "next";

function handler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  return res.status(200).json({ message: "Success" });
}

export default withAuthenticationRequired(handler);

import { withAuthenticationRequired } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ message: "Success" });
}

export default withAuthenticationRequired(handler);

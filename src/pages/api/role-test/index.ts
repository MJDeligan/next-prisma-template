import { withRequiredRole } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Success" });
}

export default withRequiredRole("ADMIN", handler);

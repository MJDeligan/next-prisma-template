import { withRequiredRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Success" });
}

export default withRequiredRole(Role.ADMIN, handler);

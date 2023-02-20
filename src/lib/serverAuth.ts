import { NextApiRequestWithLogger } from "@/types";
import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { withLogger } from "./logger";

export const withAuthenticationRequired = (
  handler: (req: NextApiRequest, res: NextApiResponse) => unknown
) => {
  return withLogger(
    async (req: NextApiRequestWithLogger, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        req.log.warn("Unauthenticated tried accessing secured api route");
        res.status(401).json({ error: "Unauthenticated" });
        return;
      }
      req.log.info("User authenticated");
      return await handler(req, res);
    }
  );
};

export const withRequiredRole = (
  requiredRole: Role,
  handler: (req: NextApiRequest, res: NextApiResponse) => unknown
) => {
  return withLogger(
    async (req: NextApiRequestWithLogger, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);
      req.log.info(session);
      if (!session) {
        req.log.warn("Unauthenticated tried accessing secured api route");
        res.status(401).json({ error: "Unauthenticated" });
        return;
      }
      req.log.info("User authenticated");
      const { role } = session.user;
      if (!role || role !== requiredRole) {
        req.log.warn("User tried to access route with incorrect role");
        res.status(403).send({ error: "Forbidden" });
        return;
      }
      return await handler(req, res);
    }
  );
};

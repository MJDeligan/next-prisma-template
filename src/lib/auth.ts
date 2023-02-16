import { getServerSession, NextAuthOptions } from "next-auth";
import { NextAPIRequestWithLogger } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name + " " + profile.family_name,
          email: profile.email,
          image: profile.picture,
          role: Role.USER,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};

export const withAuthenticationRequired = (
  handler: (req: NextApiRequest, res: NextApiResponse) => unknown
) => {
  return async (req: NextAPIRequestWithLogger, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      req.log.warn("Unauthenticated tried accessing secured api route");
      res.status(401).json({ error: "Unauthenticated" });
      return;
    }
    req.log.info("User authenticated");
    return await handler(req, res);
  };
};

export const withRequiredRole = (
  requiredRole: Role,
  handler: (req: NextApiRequest, res: NextApiResponse) => unknown
) => {
  return async (req: NextAPIRequestWithLogger, res: NextApiResponse) => {
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
  };
};

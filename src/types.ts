import { NextApiRequest } from "next";
import { Logger } from "pino";

export type NextApiRequestWithLogger = NextApiRequest & { log: Logger };

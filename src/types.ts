import { NextApiRequest } from "next";
import { Logger } from "pino";

export type NextAPIRequestWithLogger = NextApiRequest & { log: Logger };

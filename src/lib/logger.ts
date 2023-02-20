import { NextApiRequestWithLogger } from "@/types";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import pino from "pino";

type NextApiHandlerWithLogger = (
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) => unknown;

const productionLogLevel = process.env.PRODUCTION_LOG_LEVEL || "error";
const logLevel =
  process.env.NODE_ENV === "production" ? productionLogLevel : "trace";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      level: logLevel,
      options: { destination: ".log" },
    },
    { target: "pino-pretty", level: logLevel, options: {} },
  ],
});

const serverLogger = pino(transport);

export const withLogger = (
  handler: NextApiHandlerWithLogger
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const newReq = req as NextApiRequestWithLogger;
    newReq.log = serverLogger.child({
      requestId: req.headers["x-request-id"],
      url: req.url,
      method: req.method,
    });

    return await handler(newReq, res);
  };
};

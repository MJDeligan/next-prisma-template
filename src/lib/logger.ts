import { NextAPIRequestWithLogger } from "@/types";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import pino, { Logger } from "pino";

const productionLogLevel = process.env.PRODUCTION_LOG_LEVEL || "error";
const logLevel =
  process.env.NODE_ENV === "production" ? productionLogLevel : "info";

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

const logger = pino(transport);

export const withLogger = (
  handler: (req: NextAPIRequestWithLogger, res: NextApiResponse) => unknown
) => {
  return async (req: NextAPIRequestWithLogger, res: NextApiResponse) => {
    req.log = logger.child({
      requestId: req.headers["x-request-id"],
      url: req.url,
      method: req.method,
    });

    return await handler(req, res);
  };
};

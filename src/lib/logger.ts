import { NextAPIRequestWithLogger } from "@/types";
import { NextApiResponse } from "next";
import pino from "pino";

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

const serverLogger = pino(transport);

export const withLogger = (
  handler: (req: NextAPIRequestWithLogger, res: NextApiResponse) => unknown
) => {
  return async (req: NextAPIRequestWithLogger, res: NextApiResponse) => {
    req.log = serverLogger.child({
      requestId: req.headers["x-request-id"],
      url: req.url,
      method: req.method,
    });

    return await handler(req, res);
  };
};

import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

const prismaClient = new PrismaClient({
   log: [
      {
         emit: "event",
         level: "query",
      },
      {
         emit: "event",
         level: "error",
      },
      {
         emit: "event",
         level: "info",
      },
      {
         emit: "event",
         level: "warn",
      },
   ],
});

prismaClient.$on("query", (e) => {
   if (Bun.env["DEBUG"] == "true") logger.info(e);
});

prismaClient.$on("error", (e) => {
   if (Bun.env["DEBUG"] == "true") logger.error(e);
});

prismaClient.$on("info", (e) => {
   if (Bun.env["DEBUG"] == "true") logger.info(e);
});

prismaClient.$on("warn", (e) => {
   if (Bun.env["DEBUG"] == "true") logger.warn(e);
});

export default prismaClient;

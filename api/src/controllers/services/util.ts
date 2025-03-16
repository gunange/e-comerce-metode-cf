import { PrismaClient } from "@prisma/client";
import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { Token } from "@/app/token";
import { z, type ZodType } from "zod";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { HeandleRequest } from "@/controllers/services/tools/heandle-request.ts";

const dbClient = new PrismaClient();

export {
   dbClient,
   HTTPException,
   Token,
   z as zod,
   ErrorHeandler,
   HeandleRequest,
};

export type { Context, Next, ZodType };

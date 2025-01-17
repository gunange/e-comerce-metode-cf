
import { PrismaClient } from "@prisma/client";
import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { Token } from "@/app/token";
import { z, type ZodType } from "zod";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";


const dbClient = new PrismaClient();


export {
    dbClient,
    HTTPException,
    Token,
    z as zod,
    ErrorHeandler
}

export type {
    Context,
    Next,
    ZodType
}
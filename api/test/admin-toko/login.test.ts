import app from "@/index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { Env } from "@/app/env";
import * as util from "../utils";
import type { ResponseBody } from "@/controllers/interfaces/others/test";

const debug = Env.debug;

describe("POST /api/user/login", async () => {
   beforeAll(async () => {
      await util.SellerRegisterTest.create();
   });
   afterAll(async () => {
    //   await util.SellerRegisterTest.delete();
   });

   it("should register if login succses", async () => {
      const response = await app.request(
         "http://localhost:3000/api/user/login",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "test",
               password: "test",
            }),
         }
      );
      const body: ResponseBody = (await response.json()) as ResponseBody;
      if (debug) console.log(body);
      console.log(body)
      expect(response.status).toBe(201);
   });
});

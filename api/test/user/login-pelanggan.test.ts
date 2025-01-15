import app from "@/index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { Env } from "@/app/env";
import * as util from "../utils";
import type { ResponseBody } from "@/controllers/interfaces/others/test";

const debug = Env.debug;

describe("POST /api/user/login", async () => {
   beforeAll(async () => {
      await util.PelangganRegisterTest.create();
   });
   afterAll(async () => {
      await util.PelangganRegisterTest.delete();
   });

   it("should login if username wrong", async () => {
      const response = await app.request(
         "http://localhost:3000/api/user/login",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "salah",
               password: "test",
            }),
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(401);
   });
   it("should login if password wrong", async () => {
      const response = await app.request(
         "http://localhost:3000/api/user/login",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "test",
               password: "salah",
            }),
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(401);
   });
   it("should register if request succses", async () => {
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
      expect(response.status).toBe(201);
      expect(body?.data).toBeObject();
      expect(body?.data.nama).toBe("test");
      expect(body?.data?.token).not.toBeNull();
   });
});

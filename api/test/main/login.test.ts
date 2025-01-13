import app from "@/index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { Env } from "@/app/env";
import { PelangganRegisterTest } from "test/pelanggan/util.test";
import type { ResponseBody } from "@/controllers/interfaces/others/test";

const debug = Env.debug;

describe("POST /api/main/login", async () => {
   beforeAll(async () => {
      await PelangganRegisterTest.create();
      console.log("Pelanggan created successfully");
   });
   afterAll(async () => {
      await PelangganRegisterTest.delete();
      console.log("Pelanggan delete successfully");
   });

   it("should login if username wrong", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/login",
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
         "http://localhost:3000/api/main/login",
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
         "http://localhost:3000/api/main/login",
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

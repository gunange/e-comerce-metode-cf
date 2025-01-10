import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";
import { PelangganRegisterTest } from "test/pelanggan/util.test";

const debug = Env.debug;

describe("POST /api/main/login", async () => {
   it("should register if request invalid", async () => {
      const db = await PelangganRegisterTest.create();
      const response = await app.request(
         "http://localhost:3000/api/main/login",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: db.username,
               password: db.password,
            }),
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(201);
      await PelangganRegisterTest.delete();
   });
});

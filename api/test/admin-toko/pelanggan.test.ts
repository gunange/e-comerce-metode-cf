import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";

let debug = Env.debug;
debug = true;

describe("POST /api/main/register/seller", () => {
   it("should pelanggan get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/pelanggan",
         {
            method: "GET",
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(200);
   });
});

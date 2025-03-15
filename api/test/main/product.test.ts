import app from "@/index";
import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import * as util from "../utils";
import { Env } from "@/app/env";

const debug = Env.debug;

describe("GET /api/main/product/..", () => {
   it("should if product kategori", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/product/kategori/Fashion",
         {
            method: "GET",
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(200);
   });
   it("should if detail product", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/product/detail/31",
         {
            method: "GET",
         }
      );
      const body = await response.json();
      if (true) console.log(body, `\nstatus :`, response.status);
   });
});

import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "1742245642555f061e2eea7b4a38a66d20ada3ff50f5";

describe("GET /api/pelanggan/rekomendasi", () => {
   it("should if get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/rekomendasi/2",
         {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      const body = await response.json();
      if (debug) {
         console.log(body);
         console.log("status : ", response.status);
      } else {
         expect(response.status).toBe(200);
      }
   });
});

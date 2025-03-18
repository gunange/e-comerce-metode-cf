import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "1742245642555f061e2eea7b4a38a66d20ada3ff50f5";

describe("GET /api/pelanggan/pesanan", () => {
   it("should if get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/pesanan",
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
   it("should if terima", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/pesanan/terima/26",
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               ranting: 4,
               komentar: "Terima pesanan bagus sekali kurang pada bagia wanrah saja",
            }),
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

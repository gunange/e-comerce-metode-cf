import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "1742245642555f061e2eea7b4a38a66d20ada3ff50f5";

describe("GET /api/pelanggan/order", () => {
   it("should if get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/order",
         {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      if (debug) {
         console.log(body);
         console.log("status : ", response.status);
      } else {
         expect(response.status).toBe(200);
      }
   });
   it("should if add", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/order",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               product_id: 3,
               quantity: 2,
               price: 2000,
               total_price: 4000,
               jasa_kirim: "JNE",
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
   it("should if delete", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/order/5",
         {
            method: "DELETE",
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

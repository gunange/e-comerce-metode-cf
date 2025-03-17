import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "174202469441a1865e1e29d647d19fb09dc20a741b67";

describe("GET /api/pelanggan/keranjang", () => {
   it("should if get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/pelanggan/keranjang",
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
         "http://localhost:3000/api/pelanggan/keranjang",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               product_id: 30,
               quantity: 2,
               price: 2000,
               total_price: 4000,
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
         "http://localhost:3000/api/pelanggan/keranjang/5",
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

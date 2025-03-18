import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "1742293147836abf1c54014f4ec98f43f6f0ee5a047d";

describe("GET /api/pelanggan/order", () => {
   it("should if get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/order",
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

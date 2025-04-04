import app from "@/index";
import { describe, it, expect } from "bun:test";

import { Env } from "@/app/env";

const debug = Env.debug;
const token = "1742481930114738578372484da9801058f22630174f";

describe("GET /api/admin-toko/order", () => {
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
   it("should if proses", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/order/terima/26",
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               estimasi: "2 - 3 Hari",
               resi: "ABCDEFGHI098726",
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
   it("should if batalkan", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/order/batalkan/26",
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               keterangan: "Order dibatalkan karena jasa kirim tidak sesuai",
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

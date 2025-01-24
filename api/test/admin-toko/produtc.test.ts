import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";

let debug = Env.debug;
// debug = true;
const token = "173775172076e496f780c58d49a6bd83e7ade8dab0ae";
let id : number;

describe("POST api/admin-toko/product", async () => {
   it("should product add", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/product",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               label: "test",
               deskripsi:
                  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sunchange",
               stock: 12,
               harga: 30000,
               foto: "test unik",
            }),
         }
      );
      const body = (await response.json()) as any;
      id = Number(body?.data.id);

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });

   it("should product up", async () => {
      
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/product/${id}`,
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               label: "test2",
               deskripsi:
                  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sunchange",
               stock: 15,
               harga: 30000,
               foto: "test unik2",
            }),
         }
      );
      const body = await response.json();

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });
   it("should product get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/product",
         {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      const body = await response.json();

      expect(response.status).toBe(200);

      if (debug) console.log(body);
   });
   it("should product del", async () => {
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/product/${id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      const body = await response.json();

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });
});

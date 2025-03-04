import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";

let debug = Env.debug;
debug = false;
const token = "1741092054940dcd411cf1204271b68850c7bbd1f8c1";
let id = 1;

describe("POST api/admin-toko/staff", async () => {
   it("should staff get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/staff",
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

   it("should staff add", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/staff",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               no_hp: "082212341234",
               username: "testuser",
               nama: "testuser",
               password: "testuser",
            }),
         }
      );
      const body = (await response.json()) as any;
      id = Number(body?.data.id);

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });

   it("should staff up", async () => {
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/staff/${id}`,
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               no_hp: "082212341235",
               username: "testuser",
               nama: "testuser",
               password: "testuser",
            }),
         }
      );
      const body = await response.json();

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });
   it("should staff del", async () => {
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/staff/${id}`,
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

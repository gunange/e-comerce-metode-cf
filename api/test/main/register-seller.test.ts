import app from "@/index";
import { describe, it, expect } from "bun:test";
import { AdminTokoRegisterTest } from "../admin-toko/util.test";
import { Env } from "@/app/env";


const debug = Env.debug;

describe("POST /api/main/register/seller", () => {
   it("should register if request no body", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/seller",
         {
            method: "POST",
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(404);
   });
   it("should register if request invalid", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/seller",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "testuser",
               nama: "testuser",
            }),
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(400);
   });

   it("should register pelanggan success", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/seller",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "testuser",
               nama: "testuser",
               password: "testuser",
               no_hp: "082212341234",
               alamat_toko: "test",
               nama_toko: "test",
            }),
         }
      );

      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(201);
   });

   it("should register pelanggan alredy exist", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/seller",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "testuser",
               nama: "testuser",
               password: "testuser",
               no_hp: "082212341234",
               alamat_toko: "test",
               nama_toko: "test",
            }),
         }
      );

      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(401);

      await AdminTokoRegisterTest.delete();
   });
});

import app from "@/index";
import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import * as util from "../utils";
import { Env } from "@/app/env";

const debug = Env.debug;

describe("POST /api/main/register/pelanggan", () => {
   beforeAll(async()=>{
      await util.PelangganRegisterTest.delete();
   })
   afterAll(async () => {
      await util.PelangganRegisterTest.delete();
   });

   it("should register if request no body", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/pelanggan",
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
         "http://localhost:3000/api/main/register/pelanggan",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               nama: "testuser",
               no_hp: "testuser",
            }),
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(400);
   });

   it("should register pelanggan success", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/pelanggan",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "testuser",
               nama: "testuser",
               no_hp: "1234567890",
               password: "testpassword",
            }),
         }
      );

      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(201);
   });

   it("should register pelanggan alredy exist", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/pelanggan",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: "testuser",
               nama: "testuser",
               no_hp: "1234567890",
               password: "testpassword",
            }),
         }
      );

      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(401);
   });
});

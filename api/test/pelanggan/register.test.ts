import app from "@/index";
import { describe, it, expect } from "bun:test";

const debug = true;

describe("POST /api/main/register/pelanggan", () => {
   it("should register if request no body", async () => {
      const response = await app.request(
         "http://localhost:3000/api/main/register/pelanggan",
         {
            method: "POST",
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(400);
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
         "http://localhost:3000/api/main/register/pelanggan",
         {
            method: "POST",
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

   // it("should register username alredy exist", async () => {
   //    const response = await app.request(
   //       "http://localhost:3000/api/main/register/pelanggan",
   //       {
   //          method: 'POST',
   //          body: JSON.stringify({
   //             username: "testuser",
   //             nama: "testuser",
   //             no_hp: "1234567890",
   //             password: "testpassword",
   //          }),
   //       }
   //    );
   //    const body = await response.json();

   //    logger.debug(body);
   //    expect(response.status).toBe(401);
   // });
});

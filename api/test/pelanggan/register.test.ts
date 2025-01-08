import { logger } from "@/app/logging";
import app from "@/index";
import { describe, it, expect } from "bun:test";

describe("POST /api/user/register/pelanggan", () => {
   it("should register if request invalid", async () => {
      const response = await app.request(
         "http://localhost:3000/api/user/register/pelanggan",
         {
            method: "POST",
            body: JSON.stringify({
               username: "",
               nama: "",
               no_hp: "",
               password: "",
            }),
         }
      );
      const body = await response.json();
      logger.debug(body);
      expect(response.status).toBe(200);
   });

   // it("should register pelanggan success", async () => {
   //    const response = await app.request(
   //       "http://localhost:3000/api/user/register/pelanggan",
   //       {
   //          method: "POST",
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
   //    expect(response.status).toBe(201);
   // });

   // it("should register username alredy exist", async () => {
   //    const response = await app.request(
   //       "http://localhost:3000/api/user/register/pelanggan",
   //       {
   //          method: "POST",
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

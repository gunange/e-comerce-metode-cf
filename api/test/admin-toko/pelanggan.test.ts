import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";

let debug = Env.debug;
debug = true;
const token = "173697436918a74edd26440d44b6964bd58bb9f20edc";

describe("POST api/admin-toko/pelanggan", async () => {
   
   it("should pelanggan get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/pelanggan",
         {
            method: "GET",
            headers :{
               'Authorization': `Bearer ${token}`
            }
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(200);
   });
   
   it("should pelanggan add", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/pelanggan",
         {
            method: "POST",
            headers :{
               'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify({
               no_hp : "082212341234",
               username: "testuser",
               nama: "testuser",
               password: "testuser",
            })
         }
      );
      const body = await response.json();
      if (debug) console.log(body);

      expect(response.status).toBe(200);
   });
});

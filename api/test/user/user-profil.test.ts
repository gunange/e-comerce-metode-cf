import app from "@/index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { Env } from "@/app/env";
import * as util from "../utils";
import type { ResponseBody } from "@/controllers/interfaces/others/test";


const debug = Env.debug;
let user : any ;
let token : string ;


describe("GET /api/user", async () => {
   beforeAll(async () => {
      user = await util.SellerRegisterTest.create();
   });
   afterAll(async () => {
      await util.SellerRegisterTest.delete();
   });

   it("should register if login succses", async () => {
      const response = await app.request(
         "http://localhost:3000/api/user/login",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: user.username,
               password: user.password,
            }),
         }
      );
      const body: ResponseBody = (await response.json()) as ResponseBody;
      if (debug) console.log(body);
      expect(response.status).toBe(201);

      token = body.data.token;
   });

   it("should login if not token", async () => {
      
      const response = await app.request(
         "http://localhost:3000/api/user",
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(401);

   });
   it("should login is token", async () => {
      
      const response = await app.request(
         "http://localhost:3000/api/user",
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(200);

   });
   
});

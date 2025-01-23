import app from "@/index";
import { describe, it, expect } from "bun:test";
import * as util from "../utils";
import { Env } from "@/app/env";
import { basename } from "path";

let debug = Env.debug;

debug = true;

const filePath = "public/test/images.jpeg";
const filePath2 = "public/test/lisa.png";

let uid : String ;

describe("POST /api/main/register/seller", () => {
   it("should add storage", async () => {
    const fileContent = Bun.file(filePath);
    
    
    const formData = new FormData();
    formData.append("file", new File([fileContent],basename(filePath),));
    formData.append("label", "test");
    formData.append("path", "product");
      const response = await app.request(
         "http://localhost:3000/api/storage",
         {
            method: "POST",
            body: formData,
            
         }
      );
      
      const body = await response.json() as any;
      if (debug) console.log(body);

      uid = body.data.uid;

      expect(response.status).toBe(200);

   });
   it("should up storage", async () => {
    const fileContent = Bun.file(filePath2);
    const formData = new FormData();
    uid = "01949226-7867-7000-a024-b2a47c5a5811";
    formData.append("file", new File([fileContent],basename(filePath2),));
      const response = await app.request(
         `http://localhost:3000/api/storage/${uid}`,
         {
            method: "POST",
            body: formData,
            
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(200);

   });
   
});

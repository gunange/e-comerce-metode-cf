import app from "@/index";
import { describe, it, expect } from "bun:test";
import * as util from "../utils";
import { Env } from "@/app/env";
import { basename } from "path";

let debug = Env.debug;

debug = true;

const filePath = "public/test/images.jpeg";

describe("POST /api/main/register/seller", () => {
   it("should register if request no body", async () => {
    const fileContent = Bun.file(filePath);
    
    
    const formData = new FormData();
    formData.append("file", new File([fileContent],basename(filePath),));
    formData.append("label", "test");
    formData.append("path", "dusun/23");
      const response = await app.request(
         "http://localhost:3000/api/storage",
         {
            method: "POST",
            body: formData,
            
         }
      );
      
      const body = await response.json();
      if (debug) console.log(body);

   });
   
});

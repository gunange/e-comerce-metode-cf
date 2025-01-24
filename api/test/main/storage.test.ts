import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";
import { basename } from "path";

let debug = Env.debug;

const filePath = "public/test/images.jpeg";
const filePath2 = "public/test/lisa.png";

let uid: String;

describe("API /api/main/register/seller", async () => {
   await it("should add storage", async () => {
      const fileContent = Bun.file(filePath);

      const formData = new FormData();
      formData.append("file", new File([fileContent], basename(filePath)));
      formData.append("label", "test");
      formData.append("path", "product");
      const response = await app.request("http://localhost:3000/api/storage", {
         method: "POST",
         body: formData,
      });

      const body = (await response.json()) as any;
      if (debug) console.log(body);

      uid = body.data.uid;

      expect(response.status).toBe(200);
   });

   it("should up storage", async () => {
      const fileContent = Bun.file(filePath2);
      const formData = new FormData();
      formData.append("file", new File([fileContent], basename(filePath2)));
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

   it("should del storage", async () => {
      const response = await app.request(
         `http://localhost:3000/api/storage/${uid}`,
         {
            method: "DELETE",
         }
      );
      const body = await response.json();
      if (debug) console.log(body);
      expect(response.status).toBe(200);
   });
});

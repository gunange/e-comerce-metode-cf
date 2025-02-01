import app from "@/index";
import { describe, it, expect } from "bun:test";
import { Env } from "@/app/env";
import { basename } from "path";

let debug = Env.debug;
// debug = true;
const token = "173775172076e496f780c58d49a6bd83e7ade8dab0ae";
const filePath = "public/test/images.jpeg";
let id: number;

describe("POST api/admin-toko/product", async () => {
   it("should product add", async () => {
      const fileContent = Bun.file(filePath);

      const formData = new FormData();
      formData.append("file", new File([fileContent], basename(filePath)));
      formData.append("label", "test2");
      formData.append("path", "product");
      const responseFoto = await app.request(
         "http://localhost:3000/api/storage",
         {
            method: "POST",
            body: formData,
         }
      );

      const bodyFoto = (await responseFoto.json()) as any;

      const uidFoto = bodyFoto.data.uid;
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/product",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               label: "test3",
               deskripsi:
                  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sunchange",
               stock: 20,
               harga: 25000,
               foto: uidFoto,
            }),
         }
      );
      const body = (await response.json()) as any;
      id = Number(body?.data.id);

      expect(response.status).toBe(200);
      if (debug) console.log(body);
   });

   it("should product up", async () => {
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/product/${id}`,
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               label: "test2",
               deskripsi:
                  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sunchange",
               stock: 15,
               harga: 30000,
            }),
         }
      );
      const body = await response.json();

      if (debug) console.log(body);
      expect(response.status).toBe(200);
   });
   it("should product get", async () => {
      const response = await app.request(
         "http://localhost:3000/api/admin-toko/product",
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
   it("should product del", async () => {
      const response = await app.request(
         `http://localhost:3000/api/admin-toko/product/${id}`,
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

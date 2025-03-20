import { CfModel } from "@/controllers/model/cf-model";
import * as util from "@/controllers/services/util";

export class RekomendasiController {
   static async index(c: util.Context) {
      const userId = c.req.param("pelanggan_id");

      // 1️⃣ Ambil semua data transaksi dari database
      const transactions = await util.dbClient.orders.findMany();

      // 2️⃣ Ubah data transaksi menjadi format yang bisa digunakan CfModel
      const userData = CfModel.transformData(transactions);

      // 3️⃣ Cari produk yang belum dirating oleh user
      const ratedProducts = userData[userId]
         ? Object.keys(userData[userId])
         : [];
      const allProducts = [
         ...new Set(transactions.map((t) => t.product_id.toString())),
      ];
      const unratedProducts = allProducts.filter(
         (productId) => !ratedProducts.includes(productId)
      );

      // 4️⃣ Prediksi rating untuk produk yang belum dirating
      const predictedRatings = unratedProducts
         .map((productId) => ({
            productId,
            predictedRating: CfModel.predictRating(userId, productId, userData),
         }))
         .filter((p) => p.predictedRating !== null) // Hanya ambil yang bisa diprediksi
         .sort((a, b) => b.predictedRating! - a.predictedRating!); // Urutkan dari rating tertinggi

      // 5️⃣ Jika tidak ada prediksi rekomendasi, ambil produk populer
      if (predictedRatings.length === 0) {
         const popularProducts = await util.dbClient.orders.groupBy({
            by: ["product_id"],
            _avg: { ranting: true },
            orderBy: { _avg: { ranting: "desc" } },
            take: 5,
         });

         const popularProductIds = popularProducts.map((p) => p.product_id);

         const recommendedProducts = await util.dbClient.product.findMany({
            where: { id: { in: popularProductIds } },
         });

         return c.json({
            message:
               "Tidak ada rekomendasi spesifik, menampilkan produk populer.",
            data: recommendedProducts,
         });
      }

      // 6️⃣ Ambil detail produk berdasarkan rekomendasi Collaborative Filtering
      const recommendedProductIds = predictedRatings
         .slice(0, 5)
         .map((p) => Number(p.productId));

      const recommendedProducts = await util.dbClient.product.findMany({
         where: { id: { in: recommendedProductIds } },
      });

      return c.json({
         userId,
         recommendedProducts,
      });
   }
}

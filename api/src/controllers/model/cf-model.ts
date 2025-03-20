export class CfModel {
   /**
    * Konversi dataset transaksi menjadi format yang dibutuhkan
    */
   static transformData(transactions: any[]): {
      [userId: string]: { [productId: string]: number };
   } {
      let userData: { [userId: string]: { [productId: string]: number } } = {};

      for (let transaction of transactions) {
         const userId = transaction.pelanggan_id.toString();
         const productId = transaction.product_id.toString();
         const rating = transaction.ranting
            ? parseFloat(transaction.ranting)
            : null;

         if (!userData[userId]) {
            userData[userId] = {};
         }

         // Masukkan rating hanya jika tidak null
         if (rating !== null) {
            userData[userId][productId] = rating;
         }
      }

      return userData;
   }

   /**
    * Fungsi untuk menghitung Cosine Similarity antara dua pengguna.
    */
   static cosineSimilarity(
      user1: { [productId: string]: number },
      user2: { [productId: string]: number }
   ): number {
      let commonProducts = Object.keys(user1).filter(
         (product) => product in user2
      );

      if (commonProducts.length === 0) return 0; // Tidak ada produk yang sama

      let dotProduct = 0;
      let sumSquareUser1 = 0;
      let sumSquareUser2 = 0;

      for (let product of commonProducts) {
         dotProduct += user1[product] * user2[product];
         sumSquareUser1 += user1[product] ** 2;
         sumSquareUser2 += user2[product] ** 2;
      }

      return (
         dotProduct / (Math.sqrt(sumSquareUser1) * Math.sqrt(sumSquareUser2))
      );
   }

   /**
    * Fungsi untuk memprediksi rating produk yang belum dirating oleh pengguna tertentu.
    */
   static predictRating(
      userId: string,
      productId: string,
      userData: { [userId: string]: { [productId: string]: number } }
   ): number | null {
      if (!(userId in userData)) return null; // Pengguna tidak ditemukan

      let similarities: { user: string; score: number }[] = [];
      let targetUserRatings = userData[userId];

      // Hitung kemiripan antara userId dan pengguna lainnya
      for (let user in userData) {
         if (user !== userId) {
            let similarity = this.cosineSimilarity(
               targetUserRatings,
               userData[user]
            );
            similarities.push({ user, score: similarity });
         }
      }

      // Filter hanya pengguna yang telah memberi rating pada produk yang dicari
      similarities = similarities.filter(
         ({ user }) => productId in userData[user]
      );

      if (similarities.length === 0) return null; // Tidak ada referensi

      // Hitung rating prediksi menggunakan weighted sum
      let numerator = 0;
      let denominator = 0;

      for (let { user, score } of similarities) {
         numerator += score * userData[user][productId];
         denominator += Math.abs(score);
      }

      return denominator === 0 ? null : numerator / denominator;
   }

   /**
    * Fungsi untuk merekomendasikan produk berdasarkan popularitas
    */
   static recommendPopularProducts(
      userData: { [userId: string]: { [productId: string]: number } },
      topN: number = 3
   ): string[] {
      let productRatings: { [productId: string]: number[] } = {};

      // Kumpulkan semua rating dari semua pengguna
      for (let user in userData) {
         for (let product in userData[user]) {
            if (!productRatings[product]) {
               productRatings[product] = [];
            }
            productRatings[product].push(userData[user][product]);
         }
      }

      // Hitung rata-rata rating per produk
      let averageRatings = Object.entries(productRatings)
         .map(([product, ratings]) => ({
            product,
            avgRating: ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
         }))
         .sort((a, b) => b.avgRating - a.avgRating); // Urutkan dari rating tertinggi

      return averageRatings.slice(0, topN).map((p) => p.product);
   }
}
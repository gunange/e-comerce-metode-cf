interface KeranjangItem {
   product: any;
   resource: (item: KeranjangItem) => any;
}

export class Order {
   static resource(db: KeranjangItem) {
      if (!db) return null;
      const product = db.product;
      delete db.product;
      return { ...product, ...db };
   }

   static collection(db: KeranjangItem[]) {
      return db.map(this.resource);
   }

   static get includeSeller() {
      return {
         product: true,
         pelanggan: {
            select: {
               alamat: true,
               no_hp: true,
               user: {
                  select: {
                     nama: true,
                  },
               },
            },
         },
         status_order: true,
      };
   }
}

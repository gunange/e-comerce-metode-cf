interface KeranjangItem {
   product: any;
   resource: (item: KeranjangItem) => any;
}

export class Keranjang {
   static resource(db: KeranjangItem) {
      const product = db.product;
      delete db.product;
      return { ...product, ...db };
   }

   static collection(db: KeranjangItem[]) {
      return db.map(this.resource);
   }
}

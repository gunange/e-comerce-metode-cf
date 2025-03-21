interface StaffItem {
   toko: any;
   user?: any;
   role?: any;
   nama?: string;
   nama_toko?: string;
   alamat_toko?: string;
   resource: (item: StaffItem) => any;
}

export class StaffResource {
   static resource(db: StaffItem) {
      if (!db) return null;
      const toko = db.toko;

      if (db.user) {
         db.role = db.user.role.role;
      }

      db.nama_toko = db.toko.nama_toko
      db.nama = db.user.nama
      db.alamat_toko = db.toko.alamat_toko
      delete db.toko;
      

      return { ...toko, ...db,  };
   }

   static collection(db: StaffItem[]) {
      return db.map(this.resource);
   }

   static get includeStaff() {
      return {
         user: {
            include: {
               role: true,
            },
         },
         toko: true,
      };
   }
}

import * as util from "@/controllers/services/util";

export class StatusOrderModel {
   static async setSelesai({
      order_id,
      pelanggan_id,
   }: {
      order_id: number;
      pelanggan_id: number;
   }) {
      await this.setStatus({
         order_id: order_id,
         pelanggan_id: pelanggan_id,
         status: "SELESAI",
      });
   }
   static async setDibatalkan({
      order_id,
      pelanggan_id,
      keterangan,
   }: {
      order_id: number;
      pelanggan_id: number;
      keterangan: string;
   }) {
     
      await util.dbClient.statusOrder.create({
         data: {
            status: "DIBATALKAN",
            order_id: order_id,
            pelanggan_id: pelanggan_id,
            keterangan :keterangan
         },
      });
   }
   static async setDiantar({
      order_id,
      pelanggan_id,
   }: {
      order_id: number;
      pelanggan_id: number;
   }) {
      await this.setStatus({
         order_id: order_id,
         pelanggan_id: pelanggan_id,
         status: "PENGANTARAN",
      });
   }
   static async setProses({
      order_id,
      pelanggan_id,
   }: {
      order_id: number;
      pelanggan_id: number;
   }) {
      await this.setStatus({
         order_id: order_id,
         pelanggan_id: pelanggan_id,
         status: "PROSES",
      });
   }

   private static async setStatus({
      status,
      order_id,
      pelanggan_id,
   }: {
      status: string;
      order_id: number;
      pelanggan_id: number;
   }) {
      
      await util.dbClient.statusOrder.create({
         data: {
            status: status,
            order_id: order_id,
            pelanggan_id: pelanggan_id,
         },
      });
   }

   static async setStatusCode(data : any){
      data.map(async(item: { id: any; } ) => {
         await util.dbClient.statusOrder.update({
            where: {
               id: item.id,
            },
            data: {
               status_code: 1,
            },
         });
      })
   }
}

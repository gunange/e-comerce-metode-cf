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
   }: {
      order_id: number;
      pelanggan_id: number;
   }) {
      await this.setStatus({
         order_id: order_id,
         pelanggan_id: pelanggan_id,
         status: "DIBATALKAN",
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
}

import { useNow } from "@vueuse/core";
import { format, parse } from "date-fns";

/* 
!  confing

?  npm i @vueuse/core
?  npm install date-fns --save 

*/


export class TimeApp {
   private _now = useNow();
   realTime = false;

   formatDate(date, time = false) {
      const formatDate = time
         ? "eeee, dd MMMM y (HH:mm:ss)"
         : "eeee, dd MMMM y";
      return format(date ?? new Date(), formatDate);
   }

   formatTo(date, formatDate = "yyyy-MM-dd") {
      return format(date ?? new Date(), formatDate);
   }
   parseTo(date) {
      return new Date(date);
   }

   formatTime(date) {
      if (typeof date !== "string") return false;
      const [hours, minutes] = date.split(":");
      return new Date(
         this.timeNow.getFullYear(),
         this.timeNow.getMonth(),
         this.timeNow.getDate(),
         parseInt(hours, 10),
         parseInt(minutes, 10)
      );
   }
   kondisiWaktu(waktu_mulai, waktu_selesai) {
      const st = this.formatTime(waktu_mulai);
      const et = this.formatTime(waktu_selesai);

      if (this.timeNow < st) {
         // belum mulai
         return 0;
      } else if (this.timeNow >= st && this.timeNow <= et) {
         // mullai
         return 1;
      } else {
         // berakhir
         return 2;
      }
   }
   calculateAge(birthdate, detail = false) {
      const today = new Date();
      const birthDate = new Date(birthdate ?? "");
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
         years--;
         months += 12;
      }
      if (days < 0) {
         const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
         );
         days += previousMonth.getDate();
      }

      if (detail) {
         return `${years} tahun ${months} bulan ${days} hari`;
      } else {
         return years;
      }
   }

   get timeNow() {
      return this.realTime ? new Date(this._now.value) : new Date();
   }
   get timeNowShow() {
      return format(new Date(this._now.value), "HH:mm:ss");
   }
}

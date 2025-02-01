import { defineRule } from "vee-validate";

defineRule("required", (e: any) => {
   if (typeof e === "number") {
      return true;
   } else if (!e) {
      return "Data ini wajib diisi";
   }
   return true;
});

defineRule("email", (e: any) => {
   if (!e || !e.length) {
      return true;
   }
   if (!/^[^@]+@\w+(\.\w+)+\w$/.test(e)) {
      return "Data yang anda masukan buka Email";
   }
   return true;
});
defineRule("minLength", (e: any, [limit]: any) => {
   if (!e || !e.length) {
      return true;
   }
   if (e.length < limit) {
      return `Minimal karaker ${limit}`;
   }
   return true;
});
defineRule("maxLength", (e: any, [limit]: any) => {
   if (!e || !e.length) {
      return true;
   }
   if (e.length > limit) {
      return `Maksimal karakter ${limit}`;
   }
   return true;
});

defineRule("minMax", (e: any, [min, max]: any) => {
   if (!e || !e.length) {
      return true;
   }
   const numericValue = Number(e);
   if (numericValue < min) {
      return `Minimal Angka ${min}`;
   }
   if (numericValue > max) {
      return `Maksimal ${max}`;
   }
   return true;
});

defineRule("minMaxLength", (e: any, [min, max]: any) => {
   if (!e || !e.length) {
      return true;
   }

   if (e.length < min) {
      return `Minimal Karakter ${min}`;
   }
   if (e.length > max) {
      return `Maksimal Karakter ${max}`;
   }
   return true;
});

defineRule("confirmed", (e, [target]: any, ctx) => {
   if (e === ctx.form[target]) {
      return true;
   }
   return "Konfirmasi Password salah";
});

defineRule("number", (e: any) => {
   if (isNaN(e)) {
      return "Data ini harus berupa angka";
   }
   return true;
});

defineRule("onlyNumber", (input: any) => {
   const nonNumberPattern = /[^0-9]/;

   if (nonNumberPattern.test(input)) {
      return "Data ini harus berupa angka dan tidak boleh ada karakter lain.";
   }
   return true;
});

defineRule("phone", (e: any) => {
   const regex = /^(?:\+62|08)[0-9]{8,12}$/;
   if (!regex.test(e)) {
      return "Nomor telepon tidak valid (format +62xxxxxxxxxxx atau 08xxxxxxxxxx)";
   }
   return true;
});

defineRule("time", (e: any) => {
   // Regular expression for 24-hour time format (HH:MM)
   const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

   if (!regex.test(e)) {
      return "Format waktu tidak valid (format HH:MM)";
   }

   // Additional validation (optional): Check if time is within valid range (00:00 - 23:59)
   const [hours, minutes] = e.split(":");
   if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return "Waktu harus berada diantara 00:00 dan 23:59";
   }

   return true;
});

defineRule("string", (e: any) => {
   if (typeof e !== "string") {
      return "Data harus berupa karakter";
   }
   return true;
});
defineRule("link", (e: any) => {
   const urlRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

   if (!urlRegex.test(e)) {
      return "Data harus berupa URL yang valid";
   }
   return true;
});

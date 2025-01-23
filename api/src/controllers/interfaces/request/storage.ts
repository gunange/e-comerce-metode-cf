import * as util from "@/controllers/services/util";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
   "image/webp",
   "image/png",
   "image/jpeg",
   "image/jpg",
];

export const IMAGE_SCHEMA : util.ZodType = util.zod
   .instanceof(File)
   .refine((files) => files.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
   .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
   );


   export const RequestInsertSchema : util.ZodType = util.zod.object({
    label : util.zod.string().min(1).max(255),
    path : util.zod.string().min(1).max(255),
   });



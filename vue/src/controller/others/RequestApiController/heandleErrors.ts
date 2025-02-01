import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./interface";
import { apps_debug } from "@/config/appInfo";

export function heandleErrors(error: any, collection: string): ApiResponse {
   if (axios.isAxiosError(error) && error.response) {
      if (apps_debug)
         console.info(
            `⛔️ api response ${collection} status:`,
            error.response.data.message
         );

      return {
         status: error.response.status,
         data: [],
         message: error.response.data
            ? error.response.data.message
            : error.response.statusText || "Error",
         errors: error.response.data.errors ?? [],
      };
   } else if (error.request) {
      if (apps_debug)
         console.info(
            `⛔️ api request ${collection} error :`,
            error.request.status == 0
               ? "Server Connection Failed"
               : error.request
         );

      return {
         status: 500,
         data: [],
         message: "Unknow error",
         errors: [],
      };
   } else {
      if (apps_debug)
         console.info(`⛔️ api error ${collection} error:`, error.message);
      return {
         status: 500,
         data: [],
         message: "Unknow error",
         errors: [],
      };
   }
}

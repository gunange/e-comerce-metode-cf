import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./interface";
import { apps_debug } from "@/config/appInfo";

import { errorHeandlersMessage } from "@/controller/others/RequestApiController/heanleErrorMessage";

export function heandleErrors(error: any, collection: string): ApiResponse {
   
   if (axios.isAxiosError(error) && error.response) {
      if (apps_debug)
         console.info(
            `⛔️ api response ${collection} status:`,
            error.response.data.message
         );

      const { errors } = errorHeandlersMessage(error.response.data);

      return {
         status: error.response.status,
         data: [],
         message: error.response.data
            ? error.response.data.message
            : error.response.statusText || "Error",
         errors: error.response.data.erros,
         detail_errors: errors ?? [],
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
         detail_errors : null,
      };
   } else {
      if (apps_debug)
         console.info(`⛔️ api error ${collection} error:`, error.message);
      return {
         status: 500,
         data: [],
         message: "Unknow error",
         errors: [],
         detail_errors : "Internal Server Error",
      };
   }
}

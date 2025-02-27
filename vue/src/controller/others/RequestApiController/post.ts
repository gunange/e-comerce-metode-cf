import { heandleAllert } from "./heandleAlert";
import { heandleErrors } from "./heandleErrors";
import { errorHeandlersMessage } from "./heanleErrorMessage";
import { ApiResponse, ToastAlertSuccessResponse } from "./interface";
import axios, { AxiosRequestConfig } from "axios";

export async function post(
   collection: string,
   body: any,
   options?: {
      config?: AxiosRequestConfig;
      alert?: ToastAlertSuccessResponse;
   }
): Promise<ApiResponse> {
   try {
      const { config, alert } = options || {};

      const { data, status, statusText } = await axios.post(
         collection,
         body,
         config
      );

      if (alert) {
         heandleAllert({
            status: status,
            response: data,
            alert: alert,
         });
      }

      
      return {
         status: status,
         data: data.data ?? [],
         message: data.message ?? statusText,
         errors: data.errors ?? [],
         detail_errors: (errorHeandlersMessage(data)).errors,
      };
   } catch (error: any) {
      return heandleErrors(error, collection);
   }
}

import { heandleAllert } from "./heandleAlert";
import { heandleErrors } from "./heandleErrors";
import { ApiResponse, ToastAlertSuccessResponse } from "./interface";
import axios, { AxiosRequestConfig } from "axios";

export async function del(
   collection: string,
   options?: {
      config?: AxiosRequestConfig;
      alert?: ToastAlertSuccessResponse;
   }
): Promise<ApiResponse> {
   try {
      const { config, alert } = options || {};
      const { data, status, statusText } = await axios.delete(
         collection,
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
      };
   } catch (error: any) {
      return heandleErrors(error, collection);
   }
}

import { AxiosResponse } from "axios";

export interface ApiResponse {
   status: number;
   data: any;
   message: string;
   errors: any;
   detail_errors: string;
}

export interface ToastAlertSuccessResponse {
   summary: string;
   detail: any;
}

export interface ApiAlertResponse {
   status: number;
   response: AxiosResponse;
   alert: ToastAlertSuccessResponse;
}

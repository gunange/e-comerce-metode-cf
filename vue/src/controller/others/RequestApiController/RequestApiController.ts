import axios from "axios";

import { api } from "@/config/apiConfig";

export class RequestApiController {
   url = api.url_api;

   init(){
      axios.defaults.baseURL = this.url;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.patch["Content-Type"] = "application/x-www-form-urlencoded";

      axios.defaults.validateStatus = (status) => {
          return status < 500;
      };
      
      axios.defaults.timeout = 30000;
   }
}




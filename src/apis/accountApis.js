import axios from "axios";
import { MERCHANT_API_URL } from "../constants/env";

export function profileApi() {
  let url = MERCHANT_API_URL + `v1/user`;
  return axios.get(url);
}

import axios from "axios";
import { API_URL } from "../constants/env";

export function i18nApi(lang = "", version = "") {
  let url = API_URL + `v1/language`;
  return axios.get(url, {
    params: {
      encode: lang,
      version: version ? version : ""
    }
  });
}

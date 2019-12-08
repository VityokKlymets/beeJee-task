import axios from "axios";
import { API_BASE, DEVELOPER_NAME } from "config/config";
import _ from "lodash";

export default async <T>(url: string, query?: any): Promise<T> => {
  const pureQuery = _.pickBy(query, _.identity);
  const responce = await axios({
    method: "GET",
    baseURL: API_BASE,
    params: {
      developer: DEVELOPER_NAME,
      ...pureQuery,
    },
    url,
  });
  const data: T = responce.data;
  return data;
};

import axios from "axios";
import { API_BASE, DEVELOPER_NAME } from "config/config";

export default async <T>(url: string, body?: any): Promise<T> => {
  const responce = await axios.post(
    `${API_BASE}${url}?developer=${DEVELOPER_NAME}`,
    body,
  );
  const data: T = responce.data;
  return data;
};

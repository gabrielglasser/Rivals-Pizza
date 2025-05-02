import axios from "axios";
import { parseCookies } from "nookies";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@rivals.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient(); 
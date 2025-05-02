import axios from "axios";
import { parseCookies } from "nookies";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://rivals-pizza-backend.vercel.app",
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
          // Adicionar lógica de refresh token ou logout se necessário
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient(); 
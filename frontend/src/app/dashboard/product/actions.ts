"use server";

import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const token = await getCookieServer();
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function registerProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  if (!name || !price || !description || !category) {
    return { error: "Todos os campos são obrigatórios" };
  }

  try {
    const token = await getCookieServer();

    await api.post("/product", {
      name,
      price: Number(price),
      description,
      category
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao cadastrar produto" };
  }
} 
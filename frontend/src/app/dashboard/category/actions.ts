"use server";

import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { revalidatePath } from "next/cache";

export async function registerCategory(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) {
    return { error: "Nome da categoria é obrigatório" };
  }

  try {
    const token = await getCookieServer();

    await api.post("/category", { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao cadastrar categoria" };
  }
} 
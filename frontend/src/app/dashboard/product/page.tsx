"use client";

import { useEffect, useState, useTransition } from "react";
import styles from "./styles.module.scss";
import { Save } from "lucide-react";
import { getCategories, registerProduct } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

export default function Product() {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Erro ao carregar categorias");
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await registerProduct(formData);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Produto cadastrado com sucesso!");
      router.push("/dashboard");
    });
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Novo Produto</h1>
      </header>

      <div className={styles.content}>
        <form className={styles.form} action={handleSubmit}>
          <select
            name="category"
            className={styles.select}
            required
            disabled={isLoading}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Digite o nome do produto"
            className={styles.input}
            required
          />

          <input
            type="text"
            name="price"
            placeholder="Preço do produto"
            className={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Descreva seu produto..."
            className={styles.textarea}
            required
          />

          <button 
            type="submit" 
            className={styles.button}
            disabled={isPending || isLoading}
          >
            <Save />
            {isPending ? "Cadastrando..." : "Cadastrar produto"}
          </button>
        </form>
      </div>
    </div>
  );
}

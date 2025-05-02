"use client";

import { useTransition } from "react";
import styles from "./styles.module.scss";
import { Save } from "lucide-react";
import { registerCategory } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Category() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await registerCategory(formData);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Categoria cadastrada com sucesso!");
      router.push("/dashboard");
    });
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Nova Categoria</h1>
      </header>

      <div className={styles.content}>
        <form className={styles.form} action={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome da categoria"
            className={styles.input}
            required
          />

          <button 
            type="submit" 
            className={styles.button}
            disabled={isPending}
          >
            <Save />
            {isPending ? "Cadastrando..." : "Cadastrar categoria"}
          </button>
        </form>
      </div>
    </div>
  );
}

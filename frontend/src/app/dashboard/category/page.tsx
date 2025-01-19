import styles from "./styles.module.scss";
import { Button } from "../components/button";
import { api } from "@/services/api";

export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
      "use server";
  
     
    }


  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form className={styles.form}
      action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria"
          required
          className={styles.input}
        />

        <Button name="Cadastrar" />
        
      </form>
    </main>
  );
}

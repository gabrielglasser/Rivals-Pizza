import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoimg from "/public/logo.png";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }

    redirect("/");

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo" />

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome"
              className={styles.input}
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="Digite sua senha"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta? Acesse
          </Link>
        </section>
      </div>
    </>
  );
}

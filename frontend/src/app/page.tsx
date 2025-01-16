import styles from "./page.module.scss";
import logoimg from "/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email === "" || password === "") {
      return;
    }

   try{

      const response = await api.post("http://localhost:3031/session", {
        email,
        password
      })

      if(!response.data.token){
        return;
      }


      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookiesStore = await cookies();
      cookiesStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (err) {
      console.log(err);
    }

    redirect("/dashboard");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo" />

        <section className={styles.login}>
          <form action={handleLogin}>
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
            <button type="submit" className={styles.button}>Acessar</button>
          </form>
            <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se</Link>

        </section>
      </div>
    </>
  );
}

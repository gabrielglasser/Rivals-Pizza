"use client";
import styles from "./styles.module.scss";
import { useFormStatus } from "react-dom";

interface Props {
  name: string;
  onClick?: () => void; // Permite que onClick seja passado
  type?: "button" | "submit"; // Adiciona suporte para diferentes tipos de botao
}

export function Button({ name, onClick, type = "submit" }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type={type} disabled={pending} className={styles.button} onClick={onClick}>
      {pending ? "Carregando..." : name}
    </button>
  );
}

"use client";
import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
    const { onRequestClose } = use(OrderContext);

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <X size={40} color="#3fffa3" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa <b>10</b>
          </span>

          <section className={styles.item}>
            <span>
              1 - <b>Coca cola</b>
            </span>
            <span className={styles.description}>Coca cola lata 350ml</span>
          </section>

          <button className={styles.confirmButton}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}

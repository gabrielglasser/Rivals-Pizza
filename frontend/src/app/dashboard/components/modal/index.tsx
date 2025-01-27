"use client";
import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    if (order?.order?.id) {
      await finishOrder(order.order.id);
    }
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <X size={40} color="#3fffa3" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          {order && (
            <span className={styles.table}>
              Mesa <b>{order.order.table}</b>
            </span>
          )}

          {order?.order?.name && (
            <span className={styles.name}>
              <b>{order.order.name}</b>
            </span>
          )}

          {order && (
            <section className={styles.item} key={order.id}>
              <span>
                Qtd: {order.amount} - <b>{order.product.name}</b> - R$ {order.product.price} 
              </span>
              <span className={styles.description}>
                {order.product.description}
              </span>
            </section>
          )}


          <button className={styles.confirmButton} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}

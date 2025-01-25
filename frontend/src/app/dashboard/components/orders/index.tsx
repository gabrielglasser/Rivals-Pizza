import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";

interface OrdersProps {
  orders: OrderProps[];
}

export function Orders({ orders }: OrdersProps) {
  return (
    <>
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>Últimos pedidos</h1>
        <button>
          <RefreshCw size={24} color="#3fffa3" />
        </button>
      </section>
      <section className={styles.listOrders}>
        {orders.map((order) => (
          <button className={styles.orderItem} key={order.id}>
            <div className={styles.tag}></div>
            <span>Mesa {order.table}</span>
          </button>
        ))}
      </section>
    </main>

    <ModalOrder />
    </>
  );
}

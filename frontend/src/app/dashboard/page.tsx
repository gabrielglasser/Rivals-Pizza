import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";
import styles from "./page.module.scss";
import { PlusCircle } from "lucide-react";

async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = await getCookieServer();

    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Dashboard() {
  const orders = await getOrders();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Pedidos</h1>
        <div className={styles.actions}>
          <button className={styles.newOrderButton}>
            <PlusCircle />
            Novo Pedido
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <Orders orders={orders} />
      </div>
    </div>
  );
}

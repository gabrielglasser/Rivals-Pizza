"use client";
import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrdersProps {
  orders: OrderProps[];
}

export function Orders({ orders }: OrdersProps) {
  const { isOpen, onRequestOpen, onRequestClose } = use(OrderContext);
  const router = useRouter();

  async function handleDatailOrder(order_id: string) {
     await onRequestOpen(order_id);
  }

  function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados com sucesso!");
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>
        <section className={styles.listOrders}>
          {orders.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

          {orders.map((order) => (
            <button className={styles.orderItem} key={order.id} onClick={ () => handleDatailOrder(order.id)}>
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}

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
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Últimos pedidos</h2>
          <button 
            className={styles.refreshButton}
            onClick={handleRefresh}
            title="Atualizar pedidos"
          >
            <RefreshCw />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <RefreshCw size={32} />
            <p>Nenhum pedido aberto foi encontrado...</p>
          </div>
        ) : (
          <div className={styles.orderGrid}>
            {orders.map((order) => (
              <button 
                className={styles.orderItem} 
                key={order.id} 
                onClick={() => handleDatailOrder(order.id)}
              >
                <div className={styles.tag}></div>
                <span>Mesa {order.table}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      {isOpen && <ModalOrder />}
    </>
  );
}

"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

interface OrderProps {
  id: string;
  amout: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    banner: string;
    category_id: string;
    description: string;
    name: string;
    price: string;
  };
  order: {
    id: string;
    name: string;
    table: number;
    draft: boolean;
    status: boolean;
  };
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => void;
  onRequestClose: () => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order_id, setOrderId] = useState<OrderProps[]>([]);

  async function onRequestOpen(order_id: string) {
    const token = getCookieClient();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id: order_id,
      },
    });

    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider value={{ isOpen, onRequestOpen, onRequestClose }}>
      {children}
    </OrderContext.Provider>
  );
}

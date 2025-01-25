"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {

    const [isOpen, setIsOpen] = useState(false);

    function onRequestOpen(){
        setIsOpen(true);
    }

    function onRequestClose(){
        setIsOpen(false);
    }

    return (
        <OrderContext.Provider value={{isOpen, onRequestOpen, onRequestClose}}>
            {children}
        </OrderContext.Provider>
    )
}

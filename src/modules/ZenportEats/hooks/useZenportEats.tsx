import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { FoodMenuItem } from '../data/food-menu';
import { Order } from '../types';

interface ZenportEatsContextProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  selectedIdx: number;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  handleFoodItemAdd: (foodItem: FoodMenuItem) => void;
  handlePersonDelete: (personIdx: number) => void;
  handlePersonAdd: () => void;
  selectedTabFood: string;
  setSelectedTabFood: Dispatch<SetStateAction<string>>;
}

/* eslint-disable */
const defaultOrder = {
  numPeople: 0,
  lastPerson: 0,
  orders: [],
};

const ZenportEatsContext = createContext<ZenportEatsContextProps>({
  page: 1,
  setPage: () => {},
  order: defaultOrder,
  setOrder: () => {},
  selectedIdx: 0,
  setSelectedIdx: () => {},
  handleFoodItemAdd: () => {},
  handlePersonDelete: () => {},
  handlePersonAdd: () => {},
  selectedTabFood: '',
  setSelectedTabFood: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const ZenportEatsProvider = ({ children }: Props) => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedTabFood, setSelectedTabFood] = useState('');

  const handleFoodItemAdd = (foodItem: FoodMenuItem) => {
    const newOrders = [...order.orders];

    const itemToUpdate = newOrders[selectedIdx].items.find((item) => item.id === foodItem.id);

    if (itemToUpdate) {
      itemToUpdate.itemCount++;
    } else {
      newOrders[selectedIdx].items.push({
        ...foodItem,
        itemCount: 1,
      });
    }

    setOrder({
      ...order,
      orders: newOrders,
    });
  };

  const handlePersonDelete = (personIdx: number) => {
    const filteredOrders = {
      orders: order.orders.filter((_, orderIdx) => orderIdx !== personIdx),
    };

    const lastPersonsName = filteredOrders.orders[filteredOrders.orders.length - 1].name;
    const lastPersonsNumber = Number(lastPersonsName.split(' ')[1]);

    const newOrder = {
      ...filteredOrders,
      lastPerson: lastPersonsNumber,
      numPeople: filteredOrders.orders.length,
    };

    setOrder(newOrder);
  };

  const handlePersonAdd = () => {
    const newOrder = {
      ...order,
      numPeople: order.orders.length + 1,
      lastPerson: order.lastPerson + 1,
      orders: [
        ...order.orders,
        {
          name: `Person ${order.lastPerson + 1}`,
          items: [],
        },
      ],
    };

    setOrder(newOrder);
  };

  return (
    <ZenportEatsContext.Provider
      value={{
        page,
        setPage,
        order,
        setOrder,
        selectedIdx,
        setSelectedIdx,
        handleFoodItemAdd,
        handlePersonDelete,
        handlePersonAdd,
        selectedTabFood,
        setSelectedTabFood,
      }}
    >
      {children}
    </ZenportEatsContext.Provider>
  );
};

export const useZenportEats = () => useContext(ZenportEatsContext);

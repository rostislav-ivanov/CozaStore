import { createContext, useState } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([]);

  const addItem = (item) => {
    setBag([...bag, item]);
  };

  const removeItem = (itemId) => {
    setBag(bag.filter((item) => item.id !== itemId));
  };

  const values = {
    bag,
    addItem,
    removeItem,
  };

  return <BagContext.Provider value={values}>{children}</BagContext.Provider>;
};

import { createContext } from "react";
import usePersistedState from "../hooks/usePresistedState";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = usePersistedState("bag", []);

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

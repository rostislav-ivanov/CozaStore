import { createContext } from "react";
import usePersistedState from "../hooks/usePresistedState";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = usePersistedState("bag", []);

  const addItem = (item) => {
    setBag([...bag, item]);
  };

  const updateItem = (index, quantity) => {
    if (quantity <= 0) {
      return;
    }

    setBag(
      bag.map((item, i) => {
        if (i === index) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeItem = (indexItem) => {
    setBag(bag.filter((item, index) => index !== indexItem));
  };

  const clearBag = () => {
    setBag([]);
  };

  const values = {
    bag,
    addItem,
    updateItem,
    removeItem,
    clearBag,
  };

  return <BagContext.Provider value={values}>{children}</BagContext.Provider>;
};

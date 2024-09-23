import { createContext } from "react";
import usePresistedState from "../hooks/usePresistedState";
import * as wishService from "../services/wishService";

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishes, setWish] = usePresistedState("wishes", {});

  const wishList = Object.keys(wishes || {});

  const isWish = (id) => {
    return id in wishes;
  };

  const addWish = async (id) => {
    const wishData = { ...wishes, [id]: true };

    try {
      const responce = await wishService.updateWish(wishData);
      setWish(wishData);
    } catch (error) {
      alert("Failed to add wishes");
    }
  };

  const removeWish = async (id) => {
    const wishData = { ...wishes };
    delete wishData[id];
    try {
      await wishService.updateWish(wishData);
      setWish(wishData);
    } catch (error) {
      alert("Failed to remove wishes");
    }
  };

  const values = {
    wishes,
    wishList,
    isWish,
    addWish,
    removeWish,
    setWish,
  };

  return <WishContext.Provider value={values}>{children}</WishContext.Provider>;
};

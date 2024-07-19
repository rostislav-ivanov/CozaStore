import { createContext } from "react";
import usePresistedState from "../hooks/usePresistedState";
import * as wishService from "../services/wishService";

export const WishContext = createContext();

export const WishProvidr = ({ children }) => {
  const [wish, setWish] = usePresistedState("wish", {
    wishList: {},
  });

  const wishList = Object.keys(wish.wishList || {});

  const isWish = (id) => {
    return id in wish.wishList;
  };

  const addWish = async (id) => {
    const wishData = { ...wish, wishList: { ...wish.wishList, [id]: true } };
    setWish(wishData);
    try {
      await wishService.updateWish(wishData);
    } catch (error) {
      alert("Failed to add wish");
    }
  };

  const removeWish = async (id) => {
    const wishData = { ...wish, wishList: { ...wish.wishList } };
    delete wishData.wishList[id];
    setWish(wishData);
    try {
      await wishService.updateWish(wishData);
    } catch (error) {
      alert("Failed to remove wish");
    }
  };

  const values = {
    wishList,
    isWish,
    addWish,
    removeWish,
    setWish,
  };

  return <WishContext.Provider value={values}>{children}</WishContext.Provider>;
};

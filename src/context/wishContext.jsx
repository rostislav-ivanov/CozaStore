import { createContext } from "react";
import usePresistedState from "../hooks/usePresistedState";
import * as wishService from "../services/wishService";

export const WishContext = createContext();

export const WishProvidr = ({ children }) => {
  const [wishes, setWish] = usePresistedState("wishes", {
    wishList: {},
  });

  const wishList = Object.keys(wishes.wishList || {});

  const isWish = (id) => {
    return id in wishes.wishList;
  };

  const addWish = async (id) => {
    const wishData = {
      ...wishes,
      wishList: { ...wishes.wishList, [id]: true },
    };
    setWish(wishData);
    try {
      await wishService.updateWish(wishData);
    } catch (error) {
      alert("Failed to add wishes");
    }
  };

  const removeWish = async (id) => {
    const wishData = { ...wishes, wishList: { ...wishes.wishList } };
    delete wishData.wishList[id];
    setWish(wishData);
    try {
      await wishService.updateWish(wishData);
    } catch (error) {
      alert("Failed to remove wishes");
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

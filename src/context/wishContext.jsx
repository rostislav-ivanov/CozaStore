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
    try {
      const responce = await wishService.updateWish(wishData);
      setWish(wishData);
    } catch (error) {
      alert("Failed to add wishes");
    }
  };

  const removeWish = async (id) => {
    const wishData = { ...wishes, wishList: { ...wishes.wishList } };
    delete wishData.wishList[id];
    try {
      await wishService.updateWish(wishData);
      setWish(wishData);
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

import { createContext } from "react";
import usePresistedState from "../hooks/usePresistedState";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = usePresistedState("user", {
    firstName: "Ivan",
    lastName: "Ivanov",
    phone: "0888888888",
    wishList: {},
  });

  const isWish = (id) => {
    return id in user.wishList;
  };

  const addWish = (id) => {
    setUser({
      ...user,
      wishList: {
        ...user.wishList,
        [id]: true,
      },
    });
  };

  const removeWish = (id) => {
    const newWishList = { ...user.wishList };
    delete newWishList[id];
    setUser({
      ...user,
      wishList: newWishList,
    });
  };

  const values = {
    user,
    isWish,
    addWish,
    removeWish,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

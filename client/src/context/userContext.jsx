import { createContext } from "react";
import usePresistedState from "../hooks/usePresistedState";
import * as userService from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = usePresistedState("user", {
    firstName: "",
    lastName: "",
    phone: "",
    wishList: {},
  });

  const wishList = Object.keys(user.wishList);

  const isWish = (id) => {
    return id in user.wishList;
  };

  const addWish = async (id) => {
    const userData = { ...user, wishList: { ...user.wishList, [id]: true } };
    setUser(userData);
    try {
      await userService.updateUser(userData);
    } catch (error) {
      alert("Failed to add wish");
    }
  };

  const removeWish = async (id) => {
    const userData = { ...user, wishList: { ...user.wishList } };
    delete userData.wishList[id];
    setUser(userData);
    try {
      await userService.updateUser(userData);
    } catch (error) {
      alert("Failed to remove wish");
    }
  };

  const values = {
    user,
    wishList,
    isWish,
    addWish,
    removeWish,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

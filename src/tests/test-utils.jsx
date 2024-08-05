import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { WishContext } from "../context/wishContext";
import { BagContext } from "../context/bagContext";
import {
  mockAuthContextValue,
  mockWishContextValue,
  mockBagContextValue,
} from "./mockData";

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContextValue}>
        <WishContext.Provider value={mockWishContextValue}>
          <BagContext.Provider value={mockBagContextValue}>
            {children}
          </BagContext.Provider>
        </WishContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

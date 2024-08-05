import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { WishContext } from "../context/wishContext";
import { BagProvider } from "../context/bagContext";
import { mockAuthContextValue, mockWishContextValue } from "./mockData";

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContextValue}>
        <WishContext.Provider value={mockWishContextValue}>
          <BagProvider>{children}</BagProvider>
        </WishContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

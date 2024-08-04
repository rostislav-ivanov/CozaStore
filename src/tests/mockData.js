import { vi } from "vitest";

export const mockProductData = {
  _id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95",
  name: "Esprit Ruffle Shirt",
  images: ["/images/product-01.jpg"],
  price: 16.64,
  sizes: ["S", "M", "L"],
  colors: ["Red", "Blue"],
};

export const mockAuthContextValue = { isAuthenticated: true };

export const mockWishContextValue = {
  isWish: vi.fn(),
  addWish: vi.fn(),
  removeWish: vi.fn(),
};

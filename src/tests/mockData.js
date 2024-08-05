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

export const mockBagDate = [
  {
    _id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95",
    name: "Esprit Ruffle Shirt",
    image: "/images/product-01.jpg",
    price: 16.64,
    size: "M",
    color: "Red",
    quantity: 2,
  },
  {
    _id: "c7f51805-242b-45ed-ae3e-80b68605141b",
    name: "Only Check Trouser",
    image: "/images/product-03.jpg",
    price: 25.5,
    size: "S",
    color: "Blue",
    quantity: 3,
  },
];

export const mockCount = mockBagDate.reduce(
  (acc, item) => acc + item.quantity,
  0
);

export const mockBagContextValue = {
  bag: [],
  addItem: vi.fn(),
  updateItem: vi.fn(),
  removeItem: vi.fn(),
  clearBag: vi.fn(),
  count: 0,
};

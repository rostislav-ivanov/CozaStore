import { vi } from "vitest";

export const mockProductData = {
  _id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95",
  name: "Esprit Ruffle Shirt",
  images: ["/images/product-01.jpg"],
  price: 16.64,
  sizes: ["S", "M", "L"],
  colors: ["Red", "Blue"],
};

export const mockAuthContextValue = {
  isAuthenticated: true,
};

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

export const mockProfileData = {
  _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8",
  email: "peter@abv.bg",
  firstName: "Peter",
  lastName: "Petrov",
  phone: "0888888888",
  shippingCity: "София",
  shippingOffice: "София Иван Вазов (бул. Витоша 150)",
  _createdOn: 1721399083701,
  _id: "403c1227-efce-4de0-b3bb-0030d31925c2",
};

export const mockCitiesData = [
  { id: "1", name: "София" },
  { id: "2", name: "Пловдив" },
];

export const mockOfficesData = [
  { id: "1", name: "София Иван Вазов (бул. Витоша 150)" },
  { id: "2", name: "София Лозенец (ул. Лозенец 15)" },
];

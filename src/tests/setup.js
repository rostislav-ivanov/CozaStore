import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

// Mock productService
vi.mock("../services/productService", () => {
  return {
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
    getProductsCount: vi.fn(),
    getDetailsById: vi.fn(),
    getWishListProducts: vi.fn(),
  };
});

// Mock profileService
vi.mock("../services/profileService", () => {
  return {
    createProfile: vi.fn(),
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
    validateToken: vi.fn(),
  };
});

// Mock shippingService
vi.mock("../services/shippingService", () => {
  return {
    getCities: vi.fn(),
    getOffices: vi.fn(),
  };
});

// Mock useNavigate from react-router-dom with partial mock
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

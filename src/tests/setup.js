import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

// Mock productService
vi.mock("../services/productService", () => {
  return {
    getProductById: vi.fn(),
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

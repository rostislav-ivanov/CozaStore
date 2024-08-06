import { test, describe, expect, beforeEach } from "vitest";
import { render, screen, prettyDOM, fireEvent } from "../../tests/test-utils";

import Cart from "./Cart";
import {
  mockBagContextValue,
  mockBagDate,
  mockCount,
} from "../../tests/mockData";

describe("Cart component", () => {
  beforeEach(() => {
    mockBagContextValue.bag = [...mockBagDate];
    mockBagContextValue.count = mockCount;
  });

  test("renders correctly", () => {
    const { container } = render(<Cart />);
    //console.log(prettyDOM(container));
    expect(container).toMatchSnapshot();
  });

  test("displays items in the cart", () => {
    render(<Cart />);
    mockBagDate.forEach((item) => {
      expect(screen.getByText(`Color: ${item.color}`)).toBeInTheDocument();
      expect(screen.getByText(`Size: ${item.size}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${item.quantity} x $ ${Number(item.price).toFixed(2)}`
        )
      ).toBeInTheDocument();
    });
  });

  test("displays correct total amount", () => {
    const total = mockBagDate.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    render(<Cart />);
    expect(
      screen.getByText(`Total: $ ${Number(total).toFixed(2)}`)
    ).toBeInTheDocument();
  });

  test("handles empty cart", () => {
    mockBagContextValue.bag = [];
    mockBagContextValue.count = 0;
    render(<Cart />);
    expect(screen.getByText("Your cart is empty!")).toBeInTheDocument();
  });

  test("checkout button is present and clickable", () => {
    render(<Cart />);
    const checkoutButton = screen.getByText("Check Out");
    expect(checkoutButton).toBeInTheDocument();
    fireEvent.click(checkoutButton);

    expect(checkoutButton.closest("a")).toHaveAttribute("href", "/checkout");
  });
});

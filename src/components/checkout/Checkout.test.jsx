import { test, describe, expect, beforeEach } from "vitest";
import {
  render,
  screen,
  prettyDOM,
  fireEvent,
  waitFor,
  getByText,
} from "../../tests/test-utils";

import Checkout from "./Checkout";
import * as profileService from "../../services/profileService";
import * as shippingService from "../../services/shippingService";
import {
  mockBagContextValue,
  mockBagDate,
  mockCount,
  mockProfileData,
  mockCitiesData,
  mockOfficesData,
} from "../../tests/mockData";

describe("Checkout component", () => {
  beforeEach(() => {
    mockBagContextValue.bag = [...mockBagDate];
    mockBagContextValue.count = mockCount;
    shippingService.getCities.mockResolvedValue(mockCitiesData);
  });

  test("renders correctly", () => {
    const { container } = render(<Checkout />);
    //console.log(prettyDOM(container));
    expect(container).toMatchSnapshot();
  });

  test("displays items in the cart", () => {
    render(<Checkout />);
    const imgElements = [...screen.getAllByAltText("IMG")];
    const quantities = [...screen.getAllByRole("spinbutton")];
    mockBagDate.forEach((item, index) => {
      expect(quantities[index]).toHaveValue(item.quantity);
      expect(imgElements[index]).toHaveAttribute("src", item.image);
      expect(screen.getByText(`Color: ${item.color}`)).toBeInTheDocument();
      expect(screen.getByText(`Size: ${item.size}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(
        screen.getByText(`$ ${Number(item.price).toFixed(2)}`)
      ).toBeInTheDocument();
    });
  });

  test("display subtotal", () => {
    const subTotal = mockBagContextValue.bag.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    render(<Checkout />);
    const subtotalLabel = screen.getByText("Subtotal:");
    const parentElement = subtotalLabel.closest(".flex-w.flex-t.bor12.p-b-13");
    const subtotalValue = parentElement.children[1];
    expect(subtotalValue).toHaveTextContent(`$ ${subTotal.toFixed(2)}`);
  });

  test("display shipping address if it is in user profile", async () => {
    profileService.getProfile.mockResolvedValueOnce(mockProfileData);
    shippingService.getOffices.mockResolvedValueOnce(mockOfficesData);
    render(<Checkout />);
    await waitFor(
      () => expect(profileService.getProfile).toHaveBeenCalled(),
      expect(shippingService.getCities).toHaveBeenCalled()
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/There are no offices available in/)
      ).not.toBeInTheDocument()
    );
    const firstNameInput = screen.getByPlaceholderText("First Name");
    expect(firstNameInput).toHaveValue(mockProfileData.firstName);
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    expect(lastNameInput).toHaveValue(mockProfileData.lastName);
    const phoneInput = screen.getByPlaceholderText("Phone");
    expect(phoneInput).toHaveValue(mockProfileData.phone);
    const cityOption = screen.getByTestId("city");
    expect(cityOption.value).toBe(mockProfileData.shippingCity);
    const officeOption = screen.getByTestId("office");
    expect(officeOption.value).toBe(mockProfileData.shippingOffice);
    const subTotal = mockBagDate.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const subTotalElement = screen.getByTestId("subTotal");
    expect(subTotalElement).toHaveTextContent(`$ ${subTotal.toFixed(2)}`);
    const shippingElement = screen.getByTestId("shippingPrice");
    expect(shippingElement).toHaveTextContent("$ 4.99");
    const totalElement = screen.getByTestId("total");
    expect(totalElement).toHaveTextContent(`$ ${(subTotal + 4.99).toFixed(2)}`);
  });

  test("display shipping address if it is NOT in user profile", async () => {
    profileService.getProfile.mockResolvedValueOnce({});
    shippingService.getOffices.mockResolvedValueOnce(mockOfficesData);
    render(<Checkout />);
    await waitFor(
      () => expect(profileService.getProfile).toHaveBeenCalled(),
      expect(shippingService.getCities).toHaveBeenCalled()
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/There are no offices available in/)
      ).not.toBeInTheDocument()
    );
    const firstNameInput = screen.getByPlaceholderText("First Name");
    expect(firstNameInput).toHaveValue("");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    expect(lastNameInput).toHaveValue("");
    const phoneInput = screen.getByPlaceholderText("Phone");
    expect(phoneInput).toHaveValue("");
    expect(screen.getByText("Choose a city")).toBeInTheDocument();
    const subTotal = mockBagDate.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const subTotalElement = screen.getByTestId("subTotal");
    expect(subTotalElement).toHaveTextContent(`$ ${subTotal.toFixed(2)}`);
    expect(screen.queryByTestId("shippingPrice")).not.toBeInTheDocument();
    const totalElement = screen.getByTestId("total");
    expect(totalElement).toHaveTextContent(`$ ${(subTotal + 0).toFixed(2)}`);
  });

  // test if on ckick "+" button the function updateItem is called with the right arguments
  test("update item quantity on click '+' button", () => {
    render(<Checkout />);
    const plusButtons = [...screen.getAllByTestId("plus")];
    plusButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(mockBagContextValue.updateItem).toHaveBeenCalledWith(
        index,
        mockBagDate[index].quantity + 1
      );
    });
  });

  // test if on ckick "-" button the function updateItem is called with the right arguments
  test("update item quantity on click '-' button", () => {
    render(<Checkout />);
    const minusButtons = [...screen.getAllByTestId("minus")];
    minusButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(mockBagContextValue.updateItem).toHaveBeenCalledWith(
        index,
        mockBagDate[index].quantity - 1
      );
    });
  });

  // test if input quantity is changed the function updateItem is called with the right arguments
  test("update item quantity on change input", () => {
    render(<Checkout />);
    const quantityInputs = [...screen.getAllByTestId("quantity")];
    quantityInputs.forEach((input, index) => {
      expect(input).toBeInTheDocument();
      fireEvent.change(input, { target: { value: 5 } });
      expect(mockBagContextValue.updateItem).toHaveBeenCalledWith(index, 5);
    });
  });
});

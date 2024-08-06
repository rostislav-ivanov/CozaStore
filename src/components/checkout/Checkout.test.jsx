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
    profileService.getProfile.mockResolvedValue(mockProfileData);
    shippingService.getCities.mockResolvedValue(mockCitiesData);
    shippingService.getOffices.mockResolvedValue(mockOfficesData);
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
    const cityOption = document.getElementById("city");
    expect(cityOption.value).toBe(mockProfileData.shippingCity);
    const officeOption = document.getElementById("office");
    expect(officeOption.value).toBe(mockProfileData.shippingOffice);
  });
});

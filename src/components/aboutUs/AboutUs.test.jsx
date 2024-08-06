import { test, expect } from "vitest";
import { render } from "@testing-library/react";

import AboutUs from "./AboutUs";

test("true test", () => {
  expect(true).toBe(true);
});

test("AboutUs renders", () => {
  const { getByText } = render(<AboutUs />);
  expect(getByText("About")).toBeVisible();
});

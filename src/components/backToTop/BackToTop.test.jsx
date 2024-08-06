import { test, describe, expect, beforeAll, vi, afterAll } from "vitest";
import { render, fireEvent, act, prettyDOM } from "@testing-library/react";
import BackToTop from "./BackToTop";

describe("BackToTop component", () => {
  beforeAll(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterAll(() => {
    window.scrollTo.mockRestore();
  });

  test("button is visible when scrolled down and invisible when scrolled up", () => {
    const { container } = render(<BackToTop />);
    //console.log(prettyDOM(container));
    const button = container.querySelector(".btn-back-to-top");

    expect(button).toHaveStyle("display: none");

    // Simulate scrolling down
    act(() => {
      window.innerHeight = 1000; // Mock window height
      fireEvent.scroll(window, { target: { scrollY: 600 } });
    });

    expect(button).toHaveStyle("display: flex");

    // Simulate scrolling up
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 300 } });
    });

    expect(button).toHaveStyle("display: none");
  });

  test("clicking the button scrolls to top smoothly", () => {
    const { container } = render(<BackToTop />);
    const button = container.querySelector(".btn-back-to-top");

    // Simulate scrolling down to make the button visible
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 600 } });
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("scroll event listener is cleaned up on unmount", () => {
    const { unmount } = render(<BackToTop />);
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});

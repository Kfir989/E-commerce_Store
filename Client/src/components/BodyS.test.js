import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BodyS from "./BodyS";
import Video from "./Background/nightsky.mp4";
import { ShopContext } from "./Context";

// --- Shared test data ---
const mockProducts = [
  { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/test.jpg", Desc: "A test product" }
];

// --- Utility to mock localStorage & render with optional context ---
function renderWithContext(ctxValue = { addToCart: jest.fn(), cartItems: { 1: 0 } }) {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));
  return render(
    <ShopContext.Provider value={ctxValue}>
      <BodyS />
    </ShopContext.Provider>
  );
}

// ----------------------
//  Home Page Elements
// ----------------------
describe("Home page static elements", () => {
  test("renders background video", () => {
    render(<BodyS />);
    const videoElement = screen.getByTestId("video");
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("src", Video);
  });

  test("renders main heading, intro paragraph and About Us section", () => {
    render(<BodyS />);
    expect(screen.getByText(/Designers Prodocuts Awaiting/i)).toBeInTheDocument();
    expect(screen.getByText(/Lets get started!/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Leh-Leha, your ultimate/i)).toBeInTheDocument();
  });

  test("renders 'Go To Shop' button", () => {
    render(<BodyS />);
    expect(screen.getByRole("button", { name: /Go To Shop/i })).toBeInTheDocument();
  });
});

// ----------------------
//  Shop / Products
// ----------------------
describe("Shop products and cart interactions", () => {
  test("renders products from localStorage", () => {
    renderWithContext();
    expect(screen.getByText("Test Shoe")).toBeInTheDocument();
    expect(screen.getByText("A test product")).toBeInTheDocument();
    expect(screen.getByText(/100₪/)).toBeInTheDocument();
  });

  test("clicking 'Add To Cart' calls addToCart with correct Id", () => {
    const addToCartMock = jest.fn();
    renderWithContext({ addToCart: addToCartMock, cartItems: {} });

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(1);
  });

  test("if cartItems has amount > 0, button shows count in parentheses", () => {
    renderWithContext({ addToCart: jest.fn(), cartItems: { 1: 2 } });
    expect(
      screen.getByRole("button", { name: /add to cart \(2\)/i })
    ).toBeInTheDocument();
  });
});
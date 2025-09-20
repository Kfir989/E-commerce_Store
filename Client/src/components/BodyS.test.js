import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bodys from "./BodyS";
import { ShopContext } from "./Context";

// Mock products for context
const mockProducts = [
  { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/test.jpg", Desc: "A test product" }
];

// Utility to render Bodys with context
function renderWithContext(ctxValue = { products: mockProducts, addToCart: jest.fn(), cartItems: { 1: 0 } }) {
  return render(
    <ShopContext.Provider value={ctxValue}>
      <Bodys />
    </ShopContext.Provider>
  );
}

describe("BodyS component", () => {
  test("renders static homepage elements", () => {
    renderWithContext();
    expect(screen.getByTestId("video")).toBeInTheDocument();
    expect(screen.getByText(/Designers Prodocuts Awaiting/i)).toBeInTheDocument();
    expect(screen.getByText(/Lets get started!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go To Shop/i })).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Leh-Leha/i)).toBeInTheDocument();
  });

  test("renders shop section and products from context", () => {
    renderWithContext();
    expect(screen.getByText("Leh-Leha Shop")).toBeInTheDocument();
    expect(screen.getByText("Test Shoe")).toBeInTheDocument();
    expect(screen.getByText("A test product")).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  test("shows 'No products available' if products array is empty", () => {
    renderWithContext({ products: [], addToCart: jest.fn(), cartItems: {} });
    expect(screen.getByText("No products available")).toBeInTheDocument();
  });
});
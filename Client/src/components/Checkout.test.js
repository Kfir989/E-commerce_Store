import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CheckOut from "./Checkout";
import { ShopContext } from "./Context";

// default context
const defaultContext = {
  cartItems: { 1: 2 }, 
  gettotalprice: () => 200
};

// Helper to render the checkout page with context
const renderCheckout = (contextValue = defaultContext) => {
  return render(
    <ShopContext.Provider value={contextValue}>
      <CheckOut />
    </ShopContext.Provider>
  );
};

// Mock localStorage products
const mockProducts = [
  { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/img.jpg" }
];

// Set and Restore the state
beforeEach(() => {
  localStorage.setItem("products", JSON.stringify(mockProducts));
});

afterEach(() => {
  localStorage.clear();
});

test("renders form fields and cart table", () => {
  renderCheckout();

  // Form fields
  expect(screen.getByPlaceholderText(/Joe/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/1234 Main St/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/0501234567/i)).toBeInTheDocument();

  // Shipment select box
  expect(screen.getByRole("combobox")).toBeInTheDocument();

  // Checkout button
  expect(screen.getByText(/Continue to checkout/i)).toBeInTheDocument();

  // Cart table headers
  expect(screen.getByText(/Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
});

test("alerts if required fields are missing or invalid", () => {
  window.alert = jest.fn();

  renderCheckout();

  const button = screen.getByText(/Continue to checkout/i);
  fireEvent.click(button);

  // Should alert missing fields
  expect(window.alert).toHaveBeenCalled();
});

test("renders cart items with correct subtotal and total", () => {
  renderCheckout();

  // Cart item row
  expect(screen.getByText("Test Shoe")).toBeInTheDocument();
  expect(screen.getByText("x2")).toBeInTheDocument();
  expect(screen.getByText("200₪")).toBeInTheDocument();

  // Total row
  expect(screen.getByText("Total:")).toBeInTheDocument();
  expect(screen.getByText("200₪")).toBeInTheDocument();
});

test("quick shipment adds 20₪ to total", () => {
  renderCheckout();

  fireEvent.change(screen.getByLabelText(/Shipment/i), {
    target: { value: "Quick shipment: (3-7 business days) 20₪" }
  });

  expect(screen.getByText("220")).toBeInTheDocument();
});


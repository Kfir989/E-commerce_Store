import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Cart from "./Cart";
import { ShopContext } from "./Context";

// default context
const defaultContext = {
  cartItems: {},
  gettotalprice: () => 0,
  Handleclick: jest.fn()
};

// Helper function to render Cart with context
const renderCart = (contextValue = defaultContext) => {
  return render(
    <ShopContext.Provider value={contextValue}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </ShopContext.Provider>
  );
};

// Check if text and buttons exist
test("renders cart title, total price, and buttons", () => {
  renderCart();

  expect(screen.getByText(/Your Cart:/i)).toBeInTheDocument();
  expect(screen.getByText(/Total/i)).toBeInTheDocument();
  expect(screen.getByText(/Close/i)).toBeInTheDocument();
  expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
});

// Checkout button is disabled if total is 0
test("checkout button is not clickable if total is 0", () => {
  renderCart({
    ...defaultContext,
    gettotalprice: () => 0
  });

  const checkoutButton = screen.getByText(/Checkout/i).closest('button');

  expect(checkoutButton).toHaveClass('cart-btn2');

});

// Close button calls Handleclick
test("clicking Close calls Handleclick", () => {
  const handleClickMock = jest.fn();

  renderCart({
    ...defaultContext,
    Handleclick: handleClickMock
  });

  fireEvent.click(screen.getByText(/Close/i));

  expect(handleClickMock).toHaveBeenCalledTimes(1);
});
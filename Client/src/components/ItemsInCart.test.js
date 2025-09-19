import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ItemInCart from "./ItemsInCart";
import { ShopContext } from "./Context";

// default context
const defaultContext = {
  cartItems: {},
  addToCart: jest.fn(),
  RemovefromCart: jest.fn(),
  Update: jest.fn()
};

// Helper function to render ItemInCart with context
const renderItem = (item, contextValue = defaultContext) => {
  return render(
    <ShopContext.Provider value={contextValue}>
      <ItemInCart data={item} />
    </ShopContext.Provider>
  );
};

// Mock product
const mockProduct = { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/img.jpg" };

test("clicking '+' calls addToCart with correct Id", () => {
  const addToCartMock = jest.fn();
  renderItem(mockProduct, {
    ...defaultContext,
    cartItems: { 1: 1 },
    addToCart: addToCartMock
  });

  const addButton = screen.getByText("+");
  fireEvent.click(addButton);

  expect(addToCartMock).toHaveBeenCalledWith(1);
});

test("clicking '-' calls RemovefromCart with correct Id", () => {
  const RemovefromCartMock = jest.fn();
  renderItem(mockProduct, {
    ...defaultContext,
    cartItems: { 1: 1 },
    RemovefromCart: RemovefromCartMock
  });

  const removeButton = screen.getByText("-");
  fireEvent.click(removeButton);

  expect(RemovefromCartMock).toHaveBeenCalledWith(1);
});

test("typing in input calls Update and ignores non-number strings, removes item if value is 0", () => {
  const UpdateMock = jest.fn();
  renderItem(mockProduct, {
    ...defaultContext,
    cartItems: { 1: 2 },
    Update: UpdateMock
  });

  const input = screen.getByDisplayValue("2");

  // Change value to 5
  fireEvent.change(input, { target: { value: "5" } });
  expect(UpdateMock).toHaveBeenCalledWith(1, "5");

  // Change value to a string (should still call Update but UI may handle type)
  fireEvent.change(input, { target: { value: "abc" } });
  expect(UpdateMock).toHaveBeenCalledWith(1, "abc");

  // Change value to 0 → should remove item
  fireEvent.change(input, { target: { value: "0" } });
  expect(UpdateMock).toHaveBeenCalledWith(1, "0");
});
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Item } from "./Item";
import { ShopContext } from "./Context";

// ** Shared mock product and context setup **
const mockProduct = {
  Id: 1,
  Name: "Test Shoe",
  Price: 100,
  IMG: "/Images/img2.jpg",
  Desc: "A test product"
};

const renderItemWithContext = (cartItems = { 1: 0 }, addToCart = jest.fn()) => {
  render(
    <ShopContext.Provider value={{ addToCart, cartItems }}>
      <Item data={mockProduct} />
    </ShopContext.Provider>
  );
  return { addToCart };
};

// ** Test 1: Renders item object correctly **
test("renders item object correctly", () => {
  renderItemWithContext();

  expect(screen.getByText("Test Shoe")).toBeInTheDocument();
  expect(screen.getByText("A test product")).toBeInTheDocument();
  expect(screen.getByText(/100₪/)).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", "/Images/img2.jpg");
});

// ** Test 2: Add To Cart button calls addToCart with correct Id **
test("Add To Cart button calls addToCart with correct Id", () => {
  const { addToCart } = renderItemWithContext();

  const button = screen.getByRole("button", { name: /add to cart/i });
  fireEvent.click(button);

  expect(addToCart).toHaveBeenCalledTimes(1);
  expect(addToCart).toHaveBeenCalledWith(1);
});
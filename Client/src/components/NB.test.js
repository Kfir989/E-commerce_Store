import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NB from "./NB";
import { ShopContext } from "./Context";

// default context
const defaultContext = {
  gettotalamount: () => 0,
  Handleclick: jest.fn(),
  Click: false
};

// Helper to render NB with a mock context
const renderNavbar = (contextValue = defaultContext) => {
  return render(
    <ShopContext.Provider value={contextValue}>
      <NB />
    </ShopContext.Provider>
  );
};

// Tests
test("renders cart icon and total items count", () => {
  renderNavbar({ ...defaultContext, gettotalamount: () => 3 });
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("clicking the cart icon calls Handleclick", () => {
  const handleClickMock = jest.fn();
  renderNavbar({ ...defaultContext, Handleclick: handleClickMock, gettotalamount: () => 2 });
  const menuIcon = screen.getByText("2");
  fireEvent.click(menuIcon);
  expect(handleClickMock).toHaveBeenCalledTimes(1);
});
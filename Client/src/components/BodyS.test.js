import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import BodyS from "./BodyS";
import Video from './Background/nightsky.mp4';
import { ShopContext } from "./Context"; 
// ** Home Page Testing:

// background:

test("renders background video", () => {
  render(<BodyS />);

  const videoElement = screen.getByTestId("video");

  // Check if the video + main paragraph exists
  expect(videoElement).toBeInTheDocument();
  expect(videoElement).toHaveAttribute("src", Video);
});

// text:

test("renders main heading and intro paragraph", () => {
  render(<BodyS />);

  const heading = screen.getByText(/Designers Prodocuts Awaiting/i);
  const paragraph = screen.getByText(/Lets get started!/i);
  const aboutUs = screen.getByText(/Welcome to Leh-Leha, your ultimate/i);

  // Heading,Paragraph and aboutus exist?
  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
  expect(aboutUs).toBeInTheDocument();
});

// button: 

test("renders 'Go To Shop' button", () => {
  render(<BodyS />);

  const button = screen.getByRole("button", { name: /Go To Shop/i });

  expect(button).toBeInTheDocument();
});

test("renders products from localStorage", () => {
  const mockProducts = [
    {
      Id: 1,
      Name: "Test Shoe",
      Price: 100,
      IMG: "/test.jpg",
      Desc: "A test product"
    }
  ];

  // Mock localStorage
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));

  // Create a fake context value that matches what Item expects
  const mockContextValue = {
    addToCart: jest.fn(),
    cartItems: { 1: 0 }
  };

  render(
    <ShopContext.Provider value={mockContextValue}>
      <BodyS />
    </ShopContext.Provider>
  );

  // Assertions
  expect(screen.getByText("Test Shoe")).toBeInTheDocument();
  expect(screen.getByText("A test product")).toBeInTheDocument();
  expect(screen.getByText(/100₪/)).toBeInTheDocument();
});

// Shop testing:

  // Add to cart functionality:
  test("clicking Add To Cart calls addToCart with correct Id", () => {

    const addToCartMock = jest.fn();
    const cartItemsMock = {}; 

    const mockProducts = [
      { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/test.jpg", Desc: "A test product" }
    ];
    
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));

    render(
      <ShopContext.Provider value={{ addToCart: addToCartMock, cartItems: cartItemsMock }}>
        <BodyS />
      </ShopContext.Provider>
    );

    // find the button inside the product Item
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    //  check if called with product Id == 1
    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(1);
  });

  // number of items selected is presented in the ():
  test("if cartItems has amount > 0, button shows count in parentheses", () => {

    const addToCartMock = jest.fn();
    const cartItemsMock = { 1: 2 }; // already 2 items in cart

    const mockProducts = [
      { Id: 1, Name: "Test Shoe", Price: 100, IMG: "/test.jpg", Desc: "A test product" }
    ];
    
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));

    render(
      <ShopContext.Provider value={{ addToCart: addToCartMock, cartItems: cartItemsMock }}>
        <BodyS />
      </ShopContext.Provider>
    );

    // check the button text reflects the quantity
    expect(screen.getByRole("button", { name: /add to cart \(2\)/i })).toBeInTheDocument();
  });


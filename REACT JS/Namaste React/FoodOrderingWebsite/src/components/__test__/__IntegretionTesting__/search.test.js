import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";

import MOCK_DATA from "../../../mocks/ResdataMock.json";
import { Home } from "../../../App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  }),
);
describe("Foodie App", () => {
  // Runs before every test
  beforeEach(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );
  });

  // Clear mock history after each test
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("Searching inside HeroSection", () => {
    it("should render search input", () => {
      const input = screen.getByTestId("hero-search");

      expect(input).toBeInTheDocument();
    });

    it("should update input value when user types", () => {
      const input = screen.getByTestId("hero-search");

      fireEvent.change(input, {
        target: { value: "Burger" },
      });

      expect(input).toHaveValue("Burger");
    });
  });

  describe("Search Integration on RestaurantSection", () => {
    it("should render restaurant cards from API data", async () => {
      const cards = await screen.findAllByTestId("restaurant-card");



      expect(cards.length).toBeGreaterThan(0);
    });

    it("should filter restaurants based on HeroSection search", async () => {
      // Wait until restaurant data is loaded
      await screen.findAllByTestId("restaurant-card");

      const input = screen.getByTestId("hero-search");

      // Type search term
      fireEvent.change(input, {
        target: { value: "Burger" },
      });

      // Press Enter
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
      });

      // After filtering, only restaurants with "burger" in name or cuisines should show
      const filteredCards = await screen.findAllByTestId("restaurant-card");


      expect(filteredCards.length).toBe(4);

    });
  });
});

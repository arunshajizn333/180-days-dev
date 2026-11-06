import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RestaurantCard, { ResRatingCard } from "../../RestaurantCard";
import { MOCK_DATA } from "../../../mocks/cardMockdata";


describe("RestaurantCard Page Testing", () => {


    it("Should load Restaurent Name", () => {
        render(<RestaurantCard restaurantData={MOCK_DATA} />);

        const name = screen.getByText("Theobroma")

        expect(name).toBeInTheDocument();
    });

    it("Should load Restaurent Card with Top Rated Label", () => {
         const TopRatedRestaurantCard = ResRatingCard(RestaurantCard);

        render(<TopRatedRestaurantCard restaurantData={MOCK_DATA} />);

        const label = screen.getByText(/top rated/i);

        expect(label).toBeInTheDocument();
    });



});
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Contact from "../../pages/Contact";

describe("Contact Page Testing", () => {
    it("Should load Contact us heading", () => {
        render(<Contact />);

        const heading = screen.getByRole("heading", {
            name: /contact us/i
        });

        expect(heading).toBeInTheDocument();
    });

    it("Should load link for email", () => {
        render(<Contact />);

        const link = screen.getByRole("link")

        expect(link).toBeInTheDocument();
    });


});
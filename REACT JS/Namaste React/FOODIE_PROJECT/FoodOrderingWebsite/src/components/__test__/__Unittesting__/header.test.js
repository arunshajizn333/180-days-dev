import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../../NavBar";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";
import UserContext from "../../../utils/UserContext";
import { BrowserRouter } from "react-router-dom";

describe("NavBar Testing", () => {
    it("Should render logged-in User", () => {

        const userName = "Arun";
        const setUserName = jest.fn();

        render(
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Provider store={appStore}>
                    <UserContext.Provider
                        value={{ loggedInUser: userName, setUserName }}
                    >
                        <NavBar />
                    </UserContext.Provider>
                </Provider>
            </BrowserRouter>
        );

        const userElement = screen.getByTestId("logged-in-user");

        expect(userElement).toHaveTextContent("Arun");
    });

    it("Should render logged-in User", () => {

        const userName = "Arun";
        const setUserName = jest.fn();

        render(
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Provider store={appStore}>
                    <UserContext.Provider
                        value={{ loggedInUser: userName, setUserName }}
                    >
                        <NavBar />
                    </UserContext.Provider>
                </Provider>
            </BrowserRouter>
        );

        const cartLength = screen.getByTestId("cart-length");

        expect(cartLength).toHaveTextContent("0")
    });
});
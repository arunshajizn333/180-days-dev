import { fireEvent, render, screen } from "@testing-library/react"
import HeroSection from "../../HeroSection"
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(MOCK_DATA) })
);
const mockSetSearchTerm = jest.fn();

it("should able to input search",async()=>{

   await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
        <HeroSection setSearchTerm={mockSetSearchTerm} />
        </Provider>
      </BrowserRouter>
    )
  );

   const inputTextBox=await screen.findByTestId("hero-search")

   expect(inputTextBox).toBeInTheDocument()

   fireEvent.change(inputTextBox,{target:{value : "Burger"}})
  

  
fireEvent.keyDown(inputTextBox, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
});
expect(inputTextBox).toHaveValue("Burger")
 expect(mockSetSearchTerm).toHaveBeenCalledWith("Burger");



})
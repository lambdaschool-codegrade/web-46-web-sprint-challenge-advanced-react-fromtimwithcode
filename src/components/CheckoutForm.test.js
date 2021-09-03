import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    const firstname = screen.getByLabelText(/first name:/i);
    userEvent.type(firstname, "Timothy");

    const lastname = screen.getByLabelText(/last name:/i);
    userEvent.type(lastname, "Marchant");

    const address = screen.getByLabelText(/address:/i);
    userEvent.type(address, "123 Main St");

    const city = screen.getByLabelText(/city:/i);
    userEvent.type(city, "Milwaukee");

    const state = screen.getByLabelText(/state:/i);
    userEvent.type(state, "WI");

    const zip = screen.getByLabelText(/zip:/i);
    userEvent.type(zip, "12345");

    const checkout = screen.getByRole("button");
    userEvent.click(checkout);

    await waitFor(() => {
        const successMsg = screen.queryByTestId("successMessage");
        expect(successMsg).toBeInTheDocument();
        expect(successMsg).toHaveTextContent(/timothy/i);
        expect(successMsg).toHaveTextContent(/marchant/i);
        expect(successMsg).toHaveTextContent(/123 main st/i);
        expect(successMsg).toHaveTextContent(/milwaukee/i);
        expect(successMsg).toHaveTextContent(/wi/i);
        expect(successMsg).toHaveTextContent(/12345/i);
    })
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { Auth } from "@/_components";
import { toast } from "react-toastify";
import * as services from "../app/_services";

jest.mock("../app/_services", () => ({
  getToken: jest.fn(),
}));
jest.mock("react-toastify");
jest.mock("next/navigation");

describe("Auth component", () => {
  it("renders initial elements correctly", async () => {
    await act(async () => render(<Auth />));

    const title = screen.getByText(/To add questions you need a token/i);
    const input = screen.getByPlaceholderText(/Input Email/i);
    const button = screen.getByRole("button", { name: /Get Token/i });

    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute("disabled"); // Button not disabled initially
  });

  it("handles empty email input", async () => {
    await act(async () => render(<Auth />));

    const button = screen.getByRole("button", { name: /Get Token/i });
    const input = screen.getByRole("value");

    userEvent.clear(input);
    await act(async () => userEvent.click(button));

    expect(input).toHaveValue("");

    expect(toast.error).toHaveBeenCalledWith("No input found");
  });
  
});

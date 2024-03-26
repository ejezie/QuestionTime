import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Create your quiz to ask an audience/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Home />);
    const description = screen.getByText(
      /Create interactive queustions designed for a dynamic group of audience, no matter the subject you want to test for knowledge, run a quiz with to get useful insight, or help your project./i
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the "Get Started" button', () => {
    render(<Home />);
    const button = screen.getByRole("link", {
      name: /Get Started, its free to use!/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/view");
  });

  it("renders the image", () => {
    render(<Home />);
    const image = screen.getByAltText(/A visual prompt for the quiz/i);
    expect(image).toBeInTheDocument();
  });
});

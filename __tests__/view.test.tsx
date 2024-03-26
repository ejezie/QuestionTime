import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import ViewPage from "@/(questions)/view/page";

jest.mock("../app/_services");

describe("ViewPage component", () => {
  it("renders no questions message if data is empty", async () => {
    const mockGetQuestions = jest.fn().mockResolvedValue({});
    await act(async () => render(<ViewPage />));

    const noQuestionsMessage = screen.getByText(/No Questions Yet/i);
    const folderIcon = screen.getByAltText("folder");

    expect(noQuestionsMessage).toBeInTheDocument();
    expect(folderIcon).toBeInTheDocument();
  });
});

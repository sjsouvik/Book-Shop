import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import SearchBox from "./SearchBox";
import BookModel from "./BookModel";

describe("SearchBox", () => {
  it("should render the search form", async function () {
    const screen = render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search with book name")).toBeVisible();
      expect(screen.getByPlaceholderText("Search with author name")).toBeVisible();
      expect(screen.getByRole("button", { name: /Search/ })).toBeVisible();
    });
  });
  it("should call the callback on search", async function () {
    const callback = jest.fn();
    const screen = render(
      <MemoryRouter>
        <SearchBox searchHandler={callback} />
      </MemoryRouter>
    );

    await waitFor(async () => {
      const bookNameInput = screen.getByPlaceholderText("Search with book name");
      const authorNameInput = screen.getByPlaceholderText("Search with author name");
      const searchButton = screen.getByRole("button", { name: /Search/ });
      await waitFor(() => {
        fireEvent.change(bookNameInput, { target: { value: "harry" } });
        fireEvent.change(authorNameInput, { target: { value: "j k rowling" } });
        fireEvent.click(searchButton);

        expect(callback).lastCalledWith("harry", "j k rowling");
      });
    });
  });
});

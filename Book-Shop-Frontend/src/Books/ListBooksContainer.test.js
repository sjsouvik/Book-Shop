import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import ListBooksContainer from "./ListBooksContainer";
import BookModel from "./BookModel";
import booksFactory from "./__factory__/books-factory";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useOrderDetails } from "../OrderProvider/OrderProvider";

jest.mock("../AuthProvider/AuthProvider");
jest.mock("../OrderProvider/OrderProvider");
describe("ListBooks", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
    });
    useOrderDetails.mockReturnValue({
      setBookDetails: jest.fn(),
    });
    window.scrollTo = jest.fn();
    BookModel.fetchAll = jest.fn().mockResolvedValue(booksFactory());
  });

  it("should fetch the books", async function () {
    const { getByText } = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(BookModel.fetchAll).toHaveBeenCalled();
      expect(getByText("Outliers - Malcom Gladwell")).toBeInTheDocument();
    });
  });

  it("should render the search form", async function () {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search with book name")).toBeVisible();
      expect(screen.getByPlaceholderText("Search with author name")).toBeVisible();
      expect(screen.getByRole("button", { name: /Search/ })).toBeVisible();
    });
  });

  it("should call the api when clicking search button", async function () {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );
    const bookNameInput = screen.getByPlaceholderText("Search with book name");
    const authorNameInput = screen.getByPlaceholderText("Search with author name");
    const searchButton = screen.getByRole("button", { name: /Search/ });
    await waitFor(() => {
      fireEvent.change(bookNameInput, { target: { value: "harry" } });
      fireEvent.change(authorNameInput, { target: { value: "j k rowling" } });
      fireEvent.click(searchButton);

      expect(BookModel.fetchAll).lastCalledWith("harry", "j k rowling", 0, "name,asc");
    });
  });

  it("should render the sort dropdown", async function () {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeVisible();
      expect(screen.getByText("Name A-Z")).toBeInTheDocument();
    });
  });

  it("sort options should appear on clicking dropdown", async function () {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Name Z-A")).toBeInTheDocument();
      expect(screen.getByText("Name A-Z")).toBeInTheDocument();
      expect(screen.getByText("Price High to Low")).toBeInTheDocument();
      expect(screen.getByText("Price Low to High")).toBeInTheDocument();
    });
  });

  it("should call api on selecting a sort option", async function () {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "price.amount,desc" } });

    await waitFor(() => {
      expect(BookModel.fetchAll).lastCalledWith("", "", 0, "price.amount,desc");
    });
  });

  test("should render the pagination component with page 1 as the current page", async () => {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      const pagination = screen.getByTestId("paginate-container");
      const pages = screen.container.getElementsByClassName("page-item");
      const page1 = screen.getByLabelText(/page 1 is your current page/i);

      expect(pagination).toBeInTheDocument();
      expect(page1).toBeInTheDocument();
      expect(pages.length).toBe(7);

      expect(BookModel.fetchAll).lastCalledWith("", "", 0, "name,asc");
    });
  });

  test("should call the fetch books api to get books of 2nd page on click of page 2 button", async () => {
    const screen = render(
      <MemoryRouter>
        <ListBooksContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      const pages = screen.container.getElementsByClassName("page-link");
      const page1 = screen.getByLabelText(/page 1 is your current page/i);

      fireEvent.click(pages[2]);

      expect(page1).toBeInTheDocument();
      expect(BookModel.fetchAll).lastCalledWith("", "", 1, "name,asc");
    });
  });
});

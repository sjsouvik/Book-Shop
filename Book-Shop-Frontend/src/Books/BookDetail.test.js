import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
import BookDetail from "./BookDetail";
import { createMemoryHistory } from "history";
import { useAuth } from "../AuthProvider/AuthProvider";
import BookModel from "./BookModel";
import booksFactory from "./__factory__/books-factory";
import { useOrderDetails } from "../OrderProvider/OrderProvider";

jest.mock("../AuthProvider/AuthProvider");
jest.mock("../OrderProvider/OrderProvider");
const book = booksFactory().books[0];
describe("BookDetail", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
    });
    useOrderDetails.mockReturnValue({
      setBookDetails: jest.fn(),
    });

    BookModel.fetchById = jest.fn().mockResolvedValue(book);
  });
  it("should show book details", async function () {
    const history = createMemoryHistory();
    history.push("book-details/1");
    const { getByText } = render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(BookModel.fetchById).toHaveBeenCalled();
      expect(getByText(book.name)).toBeInTheDocument();
      expect(getByText(book.authorName)).toBeInTheDocument();
      expect(getByText(book.price.currency + " " + book.price.amount)).toBeInTheDocument();
    });
  });
  it("should show out of stock message id stock is not available", async function () {
    const history = createMemoryHistory();
    history.push("book-details/1");
    const { getByText } = render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(BookModel.fetchById).toHaveBeenCalled();
      expect(getByText("Currently out of stock!")).toBeInTheDocument();
    });
  });
  it("should show purchase button book is available", async function () {
    BookModel.fetchById = jest.fn().mockResolvedValue({ ...book, stock: 10 });
    const history = createMemoryHistory();
    history.push("book-details/1");
    const { getByText } = render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(BookModel.fetchById).toHaveBeenCalled();
      expect(getByText("Purchase Now!")).toBeInTheDocument();
    });
  });
});

import React from "react";
import { render } from "@testing-library/react";
import BooksTable from "./BooksTable";
import booksFactory from "./__factory__/books-factory";
import { MemoryRouter } from "react-router-dom";
import { useOrderDetails } from "../OrderProvider/OrderProvider";

jest.mock("../OrderProvider/OrderProvider");
describe("BooksTable", () => {
  beforeEach(() => {
    useOrderDetails.mockReturnValue({
      setBookDetails: jest.fn(),
    });
  });
  it("should display single book when there is a book", function () {
    const { getByText } = render(
      <MemoryRouter>
        <BooksTable books={[booksFactory().books[0]]} />
      </MemoryRouter>
    );

    expect(getByText("Outliers - Malcom Gladwell")).toBeTruthy();
    expect(getByText("Price: 200INR")).toBeTruthy();
  });

  it("should display multiple rowhen there is a book", function () {
    const { getByText } = render(
      <MemoryRouter>
        <BooksTable books={booksFactory().books} />
      </MemoryRouter>
    );

    expect(getByText("Outliers - Malcom Gladwell")).toBeTruthy();
    expect(getByText("Harry Potter - J K Rowling")).toBeTruthy();
  });
});

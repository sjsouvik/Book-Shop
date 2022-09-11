import BookModel from "./BookModel";
import booksFactory from "./__factory__/books-factory";
import axios from "axios";

jest.mock("axios");

describe("BookModel", () => {
  it("should fetch all books from api if name and authorName is not provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books });
    const books = await BookModel.fetchAll();
    const url = "http://some-url/books?title=&author=&page=0&size=10&sortKey=name&sortOrder=asc";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(books).toHaveLength(2);
  });
  it("should fetch books from api if only name is provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books });
    const books = await BookModel.fetchAll("Harry");
    const url =
      "http://some-url/books?title=Harry&author=&page=0&size=10&sortKey=name&sortOrder=asc";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(books).toHaveLength(2);
  });
  it("should fetch books from api if only authorName is provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books });
    const books = await BookModel.fetchAll("", "J K Rowling");
    const url =
      "http://some-url/books?title=&author=J K Rowling&page=0&size=10&sortKey=name&sortOrder=asc";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(books).toHaveLength(2);
  });
  it("should fetch books from api if both name and authorName are provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books });
    const books = await BookModel.fetchAll("Harry", "J K Rowling");
    const url =
      "http://some-url/books?title=Harry&author=J K Rowling&page=0&size=10&sortKey=name&sortOrder=asc";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(books).toHaveLength(2);
  });
  it("should fetch books from api in sorted order if sort exp is provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books });
    const books = await BookModel.fetchAll("Harry", "J K Rowling", 0, "name,desc");
    const url =
      "http://some-url/books?title=Harry&author=J K Rowling&page=0&size=10&sortKey=name&sortOrder=desc";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(books).toHaveLength(2);
  });
  it("should fetch book api if id is provided", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: booksFactory().books[0] });
    const book = await BookModel.fetchById(1);
    const url = "http://some-url/books/1";
    const headers = { auth: { password: "foobar", username: "foo@test.com" } };
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(book).toHaveProperty("id", 1);
  });
});

import Book from "./Book";
import "./Book.css";

export default function BooksTable({ books }) {
  return (
    <div className="books-container">
      {books.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function booksFactory() {
  return {
    books: [
      {
        id: 1,
        name: "Outliers",
        authorName: "Malcom Gladwell",
        price: { amount: 200, currency: "INR" },
        coverImage:
          "https://dev-bootcamp-book-shop.s3.us-east-2.amazonaws.com/default_book_cover.jpg",
        stock: 0,
      },
      {
        id: 2,
        name: "Harry Potter",
        authorName: "J K Rowling",
        price: { amount: 500, currency: "INR" },
        coverImage:
          "https://dev-bootcamp-book-shop.s3.us-east-2.amazonaws.com/default_book_cover.jpg",
        stock: 10,
      },
    ],
    pageCount: 5,
  };
}

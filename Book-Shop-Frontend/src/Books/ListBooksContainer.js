import React, { useEffect, useState } from "react";
import "./ListBooksContainer.css";
import BookModel from "./BookModel";
import { FormControl, InputLabel, Select, Stack } from "@mui/material";
import BooksTable from "./BooksTable";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";

function ListBooksContainer() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortExp, setSortExp] = useState("name,asc");

  useEffect(() => {
    BookModel.fetchAll(bookName, authorName, currentPage, sortExp).then((response) => {
      setBooks(response.books);
      setTotalPages(response.pageCount);
    });
  }, [bookName, authorName, currentPage, sortExp]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  function handleSearch(bookName, authorName) {
    setBookName(bookName);
    setAuthorName(authorName);
    setCurrentPage(0);
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  function handleSortChange(event) {
    setSortExp(event.target.value);
    setCurrentPage(0);
  }
  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SearchBox searchHandler={handleSearch} />
        <FormControl style={{ width: 175 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={sortExp} label="Sort" native={true} onChange={handleSortChange}>
            <option value={"name,asc"}>Name A-Z</option>
            <option value={"name,desc"}>Name Z-A</option>
            <option value={"price.amount,asc"}>Price Low to High</option>
            <option value={"price.amount,desc"}>Price High to Low</option>
          </Select>
        </FormControl>
      </Stack>

      {books?.length > 0 ? <BooksTable books={books} /> : <h2>No results found!</h2>}

      <Pagination
        forcePage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default ListBooksContainer;

import { Button, Stack, TextField } from "@mui/material";
import React, { useRef } from "react";

function SearchBox({ searchHandler }) {
  const bookNameInputRef = useRef(null);
  const authorNameInputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    searchHandler(bookNameInputRef.current.value, authorNameInputRef.current.value);
  }
  return (
    <form className={"flex-row"} onSubmit={handleSubmit}>
      <Stack direction={"row"} spacing={2}>
        <TextField
          label="Book Name"
          variant="outlined"
          inputRef={bookNameInputRef}
          name="bookName"
          type="text"
          placeholder="Search with book name"
        />
        <TextField
          label="Author Name"
          variant="outlined"
          inputRef={authorNameInputRef}
          name="authorName"
          type="text"
          placeholder="Search with author name"
        />
        <Button variant="contained" type={"submit"}>
          Search
        </Button>
      </Stack>
    </form>
  );
}
export default SearchBox;

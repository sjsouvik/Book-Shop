import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookModel from "./BookModel";
import { Box, Button, CardMedia, Paper, Stack, Typography } from "@mui/material";
import { routePaths } from "../Router/Router";
import { useOrderDetails } from "../OrderProvider/OrderProvider";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setBookDetails } = useOrderDetails();

  useEffect(() => {
    BookModel.fetchById(id)
      .then((book) => {
        setBook(new BookModel(book));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const moveToSelectAddress = () => {
    setBookDetails({ ...book });
    navigate(routePaths.SELECT_ADDRESS);
  };

  return (
    <>
      {loading && <div>Loading details...</div>}
      {!loading && book ? (
        <Paper style={{ height: "60%" }}>
          <Stack direction={"row"} style={{ height: "100%" }}>
            <CardMedia style={{ width: "50%", height: "100%" }} image={book.coverImage}></CardMedia>
            <Stack justifyContent={"center"} style={{ width: "50%" }} padding={2}>
              <Typography align={"center"} variant="h3" component="h4">
                {book.title}
              </Typography>
              <Typography align={"center"} variant="h5" component="h5">
                {book.authorName}
              </Typography>
              <Typography align={"center"} variant="h5" component="h5">
                {book.price}
              </Typography>
              <Box marginTop={4}>
                {book.stock > 0 ? (
                  <Button variant="contained" onClick={moveToSelectAddress}>
                    Purchase Now!
                  </Button>
                ) : (
                  <Typography color={"red"} variant="p">
                    Currently out of stock!
                  </Typography>
                )}
              </Box>
            </Stack>
          </Stack>
        </Paper>
      ) : (
        <div>Book not found!</div>
      )}
    </>
  );
}

export default BookDetail;

import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "../Router/Router";
import { useOrderDetails } from "../OrderProvider/OrderProvider";
import { Button } from "@mui/material";
import React from "react";

const Book = (props) => {
  const { name, coverImage, authorName, price, id, stock } = props;

  const navigate = useNavigate();

  const { setBookDetails } = useOrderDetails();

  const moveToSelectAddress = () => {
    const bookDetails = {
      id: id,
      name: name,
      authorName: authorName,
      price: price,
    };
    setBookDetails(bookDetails);
    navigate(routePaths.SELECT_ADDRESS);
  };

  return (
    <div className="card br-5">
      <Link className="book-link" to={`books/${id}`}>
        <div>
          <img src={coverImage} alt="book" height="250" width="250" />
        </div>
        <div className="book-details">
          <p>{`${name} - ${authorName}`}</p>
          <p>{`Price: ${price?.amount}${price?.currency}`}</p>
        </div>
      </Link>

      <div className="p-5">
        {stock > 0 ? (
          <button className="btn br-5" onClick={moveToSelectAddress}>
            Buy Now
          </button>
        ) : (
          <Button className="btn br-5" color="error" variant="outlined" disabled={true}>
            Currently out of stock!
          </Button>
        )}
      </div>
    </div>
  );
};

export default Book;

import { useState } from "react";
import { useOrderDetails } from "../OrderProvider/OrderProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { Button } from "@mui/material";
import OrderModel from "./OrderModel";
import PaymentDetails from "./PaymentDetails";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router/Router";

function OrderDetails() {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("cashOnDelivery");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [holderName, setHolderName] = useState("");

  const [errors, setErrors] = useState(null);

  const [orderStatus, setOrderStatus] = useState("");

  const { bookDetails, addressDetails } = useOrderDetails();

  const navigate = useNavigate();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const bookName = bookDetails.name;
  const totalBooksPrice = bookDetails.price.amount + 50;

  const cardDetails =
    selectedPaymentOption === "cashOnDelivery"
      ? null
      : { number: cardNumber, cvv, expiry: `${expiry.split("-")[1]}/${expiry.split("-")[0]}` };

  const validateCardHandler = () => {
    const validationErrors = {};

    if (cardNumber.length !== 16) {
      validationErrors.cardNumber = "Card number is not correct";
    }

    if (cvv.length !== 3) {
      validationErrors.cvv = "CVV is not correct";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const placeOrder = () => {
    OrderModel.confirmOrder(
      bookDetails.id,
      addressDetails.id,
      selectedPaymentOption,
      cardDetails
    ).then((response) => {
      if (response.status == 201) {
        setOrderStatus("Order is placed successfully!");
        setTimeout(() => navigate(routePaths.HOME), 2 * 1000);
      } else {
        setOrderStatus("Order couldn't be placed! Please try again later.");
      }
    });
  };

  const onConfirm = () => {
    if (selectedPaymentOption === "cashOnDelivery") {
      return placeOrder();
    }

    if (validateCardHandler()) {
      placeOrder();
    }
  };

  const disableConfirmOrderBtn =
    selectedPaymentOption === "creditCard" && !(cardNumber && cvv && expiry && holderName);

  const emailId = JSON.parse(localStorage.getItem("login")).email;
  return (
    <div>
      <h2 style={{ textDecoration: "underline" }}>Order Summary</h2>
      <h3>Delivery Details</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">:</TableCell>
              <TableCell align="left">{emailId}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="left">Shipping Address</TableCell>
              <TableCell align="left">:</TableCell>
              <TableCell align="left">{addressDetails.address}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="left">Shipping Country</TableCell>
              <TableCell align="left">:</TableCell>
              <TableCell align="left">{addressDetails.country}</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        <h3>Order Details</h3>
        <TableContainer>
          <Table sx={{ minWidth: 700, borderColor: "black" }} aria-label="spanning table">
            <TableHead>
              <StyledTableRow>
                <TableCell align="left">S.No</TableCell>
                <TableCell align="left">Book Name</TableCell>
                <TableCell align="left">No. of Copies</TableCell>
                <TableCell align="left">Unit Price</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>1</TableCell>
                <TableCell align="left">
                  {bookName} - {bookDetails.authorName}
                </TableCell>
                <TableCell align="left">1</TableCell>
                <TableCell align="right">
                  {bookDetails.price.currency} {bookDetails.price.amount}
                </TableCell>
              </StyledTableRow>

              <StyledTableRow>
                <TableCell rowSpan={3} />
                <TableCell rowSpan={3} />
                <TableCell colSpan={1}>Shipping Cost</TableCell>
                <TableCell align="right">{bookDetails.price.currency} 50</TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right">
                  {bookDetails.price.currency} {totalBooksPrice}
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <PaymentDetails
        selectedPaymentOption={selectedPaymentOption}
        setSelectedPaymentOption={setSelectedPaymentOption}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        cvv={cvv}
        setCvv={setCvv}
        expiry={expiry}
        setExpiry={setExpiry}
        holderName={holderName}
        setHolderName={setHolderName}
        errors={errors}
      />

      <Button
        style={{ margin: "2rem 0 1rem 0" }}
        variant="contained"
        onClick={onConfirm}
        disabled={disableConfirmOrderBtn}
      >
        Confirm Order
      </Button>

      {orderStatus && (
        <p style={{ color: "green", fontSize: "1.2rem", margin: "1rem 0 3rem 0" }}>{orderStatus}</p>
      )}
    </div>
  );
}

export default OrderDetails;

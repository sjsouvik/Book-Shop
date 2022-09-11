import "./PaymentDetails.css";
import Message from "../Message/Message";

const PaymentDetails = (props) => {
  const {
    selectedPaymentOption,
    setSelectedPaymentOption,
    cardNumber,
    setCardNumber,
    cvv,
    setCvv,
    expiry,
    setExpiry,
    holderName,
    setHolderName,
    errors,
  } = props;

  const paymentOptionChangeHandler = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  return (
    <div>
      <h3>Payment Details</h3>
      <div className="payment-method">
        <div className="payment-options">Choose payment method:</div>
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            value="cashOnDelivery"
            checked={selectedPaymentOption === "cashOnDelivery"}
            onChange={paymentOptionChangeHandler}
          />
          <label htmlFor="cod">Cash on delivery</label>
        </div>
        <div>
          <input
            type="radio"
            id="card"
            value="creditCard"
            checked={selectedPaymentOption === "creditCard"}
            onChange={paymentOptionChangeHandler}
          />
          <label htmlFor="card">Credit Card</label>
        </div>
      </div>
      {selectedPaymentOption === "creditCard" && (
        <div className="card-details">
          <h3>Enter Card Details</h3>
          <form>
            <div className="input-field">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="number"
                placeholder="Card Number"
                value={cardNumber}
                className="br-5"
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <Message message={errors?.cardNumber} type="error" />
            </div>
            <div className="input-field">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="password"
                placeholder="CVV"
                value={cvv}
                className="br-5"
                onChange={(e) => setCvv(e.target.value)}
              />
              <Message message={errors?.cvv} type="error" />
            </div>
            <div className="input-field">
              <label htmlFor="expiry">Expires On(MM/YYYY)</label>
              <input
                id="expiry"
                type="month"
                placeholder="MM/YYYY"
                min={`${new Date().getFullYear()}-${(new Date().getMonth() + 2)
                  .toString()
                  .padStart(2, 0)}`}
                value={expiry}
                className="br-5"
                onChange={(e) => setExpiry(e.target.value)}
              />
              <Message message={errors?.expiry} type="error" />
            </div>
            <div className="input-field">
              <label htmlFor="name">Holder&apos;s Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={holderName}
                className="br-5"
                onChange={(e) => setHolderName(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;

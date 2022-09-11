import { createContext, useContext, useState } from "react";

const orderContext = createContext();
const OrderProvider = ({ children }) => {
  const [bookDetails, setBookDetails] = useState({});
  const [addressDetails, setAddressDetails] = useState({});

  return (
    <orderContext.Provider
      value={{ bookDetails, setBookDetails, addressDetails, setAddressDetails }}
    >
      {children}
    </orderContext.Provider>
  );
};

export const useOrderDetails = () => useContext(orderContext);

export default OrderProvider;

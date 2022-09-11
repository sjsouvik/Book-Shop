import { Route, Routes } from "react-router-dom";
import ListBooksContainer from "../Books/ListBooksContainer";
import SignIn from "../SignIn/SignIn";
import BookDetail from "../Books/BookDetail";
import SelectAddress from "../Users/Addresses/SelectAddress";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import OrderDetails from "../Orders/OrderDetails";

export const routePaths = {
  HOME: "/",
  SIGNIN: "/signin",
  BOOK_DETAILS: "/books/:id",
  SELECT_ADDRESS: "/selectaddress",
  ORDER_DETAILS: "/orderdetails",
};

const { HOME, SIGNIN, BOOK_DETAILS, SELECT_ADDRESS, ORDER_DETAILS } = routePaths;

const Router = () => {
  return (
    <Routes>
      <Route
        path={HOME}
        element={
          <PrivateRoute>
            <ListBooksContainer />
          </PrivateRoute>
        }
      ></Route>
      <Route path={SIGNIN} element={<SignIn />}></Route>
      <Route
        path={BOOK_DETAILS}
        element={
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path={SELECT_ADDRESS}
        element={
          <PrivateRoute>
            <SelectAddress />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path={ORDER_DETAILS}
        element={
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Router;

import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import AuthProvider from "./AuthProvider/AuthProvider";
import OrderProvider from "./OrderProvider/OrderProvider";

function App() {
  return (
    <div className="App">
      <div className="App-layout">
        <BrowserRouter>
          <AuthProvider>
            <OrderProvider>
              <Router />
            </OrderProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

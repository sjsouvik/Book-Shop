import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddressModel from "./AddressModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Router/Router";
import { useOrderDetails } from "../../OrderProvider/OrderProvider";

function SelectAddress() {
  const { addressDetails, setAddressDetails } = useOrderDetails();
  const [addresses, setAddresses] = useState([]);
  const padding = {
    paddingBottom: "5%",
    paddingTop: "5%",
  };

  const handleChange = (address) => {
    setAddressDetails({
      id: address.id,
      country: address.country,
      address: address.address,
    });
  };

  const navigate = useNavigate();
  var initialAddress = null;

  const moveToOrderDetails = () => {
    if (Object.keys(addressDetails).length === 0) {
      handleChange(initialAddress);
    }
    navigate(routePaths.ORDER_DETAILS);
  };

  var defaultAddress = null;

  function setDefaultAddress() {
    for (let ind in addresses) {
      if (addresses[ind].isdefault) {
        defaultAddress = addresses[ind].address;
        initialAddress = addresses[ind];
      }
    }
  }

  useEffect(() => {
    AddressModel.fetchByUserId().then((addresses) => {
      setAddresses(addresses);
    });
  }, []);

  if (addresses.length > 0) {
    setDefaultAddress();
    return (
      <div>
        <h2 style={padding}>Select Delivery Address</h2>
        <Card sx={{ minWidth: 275, boxShadow: "0px 0px 15px 4px grey" }}>
          <CardContent>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" style={padding}>
                Your Addresses
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={defaultAddress}
              >
                {addresses.map((address) => (
                  <FormControlLabel
                    key={address.id}
                    value={address.address}
                    control={<Radio />}
                    label={address.address}
                    style={padding}
                    onChange={() => handleChange(address)}
                  />
                ))}
              </RadioGroup>
              <div style={padding}>
                <Button variant="contained" onClick={moveToOrderDetails}>
                  Use this Address & View Order Summary
                </Button>
              </div>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div style={{ padding: "13%" }}>
      <h2>No Address available!</h2>
    </div>
  );
}
export default SelectAddress;

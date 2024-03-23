import React, { useState, useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import axios from "axios";
import { API_URL } from "../../config/config";

const Prepayment = () => {
  const [stripeApiKey, SetstripeApiKey] = useState("");

  async function getStripeApiKey(jwt) {
    const { data } = await axios.get(`${API_URL}api/v1/stripeapiKey`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    SetstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    getStripeApiKey(jwt);
    // console.log(stripeApiKey, "APP stripeeee key");
  }, []);

  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
    </>
  );
};

export default Prepayment;

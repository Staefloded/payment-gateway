import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BillingScreens from "screens/BillingScreens";
import Login from "screens/Login";
import QR from "screens/QR";
import Success from "screens/Success";
import Transfer from "screens/Transfer";
import TransferLoading from "screens/TransferLoading";
import Ussd from "screens/Ussd";
import PaymentHeader from "shared/components/PaymentHeader";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const { access_token } = useSelector((state) => state.Auth);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute auth={access_token}>
              <BillingScreens />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute auth={access_token}>
              <PaymentHeader />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<Transfer />} />
          <Route path="ussd" element={<Ussd />} />
          <Route path="qr" element={<QR />} />
        </Route>
        <Route
          path="/loading"
          element={
            <ProtectedRoute auth={access_token}>
              <TransferLoading />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute auth={access_token}>
              <Success />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;

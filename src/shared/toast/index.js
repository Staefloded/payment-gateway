import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Toast() {
  const { toastContent, toastState } = useSelector((state) => state?.toast);

  toastContent.name === "success" &&
    toastState &&
    toast.success(toastContent.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  toastContent.name === "error" &&
    toastState &&
    toast.error(toastContent.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return <ToastContainer />;
}

export default Toast;

import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ContentWrapper from "../shared/components/ContentWrapper";
import { useDispatch } from "react-redux";

function BillingScreens() {
  const navigate = useNavigate();
  const payHandler = () => {
    navigate("/payment");
  };

  const {
    Wallet: { getVirtualWallets },
  } = useDispatch((state) => state);

  useEffect(() => {
    getVirtualWallets();
  }, []);

  return (
    <ContentWrapper>
      <div className="w-[560px] h-[519px] text-[30px] border border-solid border-red rounded-[16px] bg-white boxShadow px-[112px] flex flex-col justify-between">
        <div>
          <h2 className="text-[#1A1A1A] font-medium text-6 text-center mt-[68px]">Make Payment</h2>
          <Divider className="mt-2 mb-[32px]" />

          <div className="flex justify-between items-center mb-1">
            <p className="text-[#4D4D4D] font-normal text-[14px] ">UI Unicorn Store</p>
            <p className="text-[#4D4D4D] font-normal text-[14px] ">Order №070490</p>
          </div>
          <p className="text-[#1A1A1A] font-semibold text-[32px]">₦{amount ? amount : "00"}.00</p>

          <p className="text-[#4D4D4D] font-normal text-[14px] pt-10">
            Please enter an Amount for payment
          </p>
          <input
            type="number"
            name="amount"
            placeholder="Enter an amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-[40px] border border-solid border-gray-200 rounded-lg text-[14px] px-2 py-3"
          />
          <Divider className="pt-[30px]" />
        </div>

        <div className="pb-[110px]">
          <button
            onClick={payHandler}
            className="w-full h-[44px] bg-[#3200C8] text-white font-semibold text-[16px] text-center rounded-[6px]"
          >
            Pay
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default BillingScreens;

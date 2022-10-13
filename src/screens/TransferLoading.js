import React, { useEffect, useLayoutEffect, useRef } from "react";
import ContentWrapper from "../shared/components/ContentWrapper";
import Close from "../shared/assets/socialmediaicons/Close button.svg";
import Lock from "../shared/assets/socialmediaicons/Lock.svg";
import { formatMoney } from "utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

function TransferLoading() {
  const amount = localStorage.getItem("amount") || 0;
  const navigate = useNavigate();

  const {
    Auth: { userProfile },
  } = useSelector((state) => state);

  useInterval(() => {
    navigate("/success", { replace: true });
  }, 10000);

  return (
    <ContentWrapper>
      <div className="w-[594px] h-[790px] rounded-[18px] bg-white px-6 relative flex flex-col justify-between">
        <div>
          <h2 className="text-[#090921] font-semibold text-[24px] mt-[24px] invisible">Payment</h2>
          <div
            onClick={() => navigate(-1)}
            className="absolute top-[12px] right-[12px] cursor-pointer"
          >
            <img src={Close} alt="" />
          </div>

          <div className="flex justify-end items-center">
            <div className=" inline-flex items-center space-x-6">
              <p className="text-[#6B7B8A] font-normal text-[16px]">{userProfile?.email}</p>
              <p className="text-[#6B7B8A] font-normal text-[16px]">
                Pay:{" "}
                <span className="text-[#087F7F] font-semibold flex-shrink-0">
                  {" "}
                  {formatMoney(amount)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center w-full mt-[-100px]">
          <div className="bg-[#E0D9F7] w-[140px] h-[140px] rounded-[70px] flex justify-center items-center">
            <div className="w-[65px] h-[65px] rounded-[32.5px] bg-[#3200C8] boxShadow m-[20px] round"></div>
          </div>
          <p className="text-[#565C63] font-normal text-[16px] mt-[24px] text-center">
            Checking transaction status
          </p>
        </div>

        <div className="text-center flex items-center space-x-1 w-full justify-center mb-[12px]">
          <p className="text-[#6B7B8A] font-normal text-[12px]">
            Secured by <span className="text-[#3200C8] font-semibold">Clane</span>{" "}
          </p>
          <div className="flex justify-center items-center">
            <img src={Lock} alt="" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default TransferLoading;

import { Divider, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function Ussd() {
  const transactionType = "SALES_COLLECTION";
  const navigate = useNavigate();

  const [res, setRes] = useState({});
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    Wallet: { getBanks, fundWalletUssdInit },
  } = useDispatch();

  const {
    Wallet: { ussdBanks, accounts, commission },
  } = useSelector((state) => state);

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  const amount = localStorage.getItem("amount") || 0;

  const initiateTransaction = async (bankName) => {
    setLoading(true);
    try {
      const { accountNumber } = accounts;

      const data = {
        accountNumber,
        transferAmount: Number(amount) + commission?.surcharge ?? 0 + commission?.amount ?? 0,
        transactionType,
      };

      const res = await fundWalletUssdInit(data);

      if (res) {
        setSelectedBank(bankName);
        setLoading(false);
        return setRes(res);
      }

      return;
    } catch (err) {
      setLoading(false);
    }
  };

  const selectBank = (bankName) => {
    initiateTransaction(bankName);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-[#090921] font-medium text-[18px] mb-1">USSD transfer *#</h1>
        <Divider className="m-0 p-0" />

        <div className="flex items-center space-x-8 mt-[26px]">
          <div>
            <p className="text-[#6B7B8A] font-medium text-[16px]">Choose bank</p>
            <p className="text-[#6B7B8A] font-normal text-[12px]">To start the payment</p>
          </div>
          <div className="flex-1 w-full">
            <Select
              placeholder="Choose Bank"
              onChange={(value) => selectBank(value)}
              className="sel"
              listItemHeight={10}
              listHeight={250}
              style={{
                width: "100%",
              }}
            >
              {ussdBanks.map((item, index) => {
                return (
                  <Option key={index} value={item.value}>
                    <div className="flex justify-between items-center">
                      <p className="text-[#6B7B8A] font-normal text-[16px]">{item.label}</p>
                    </div>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="max-w-[300px] mx-auto bg-gray-100 border border-dashed h-20 mt-10 flex items-center justify-center">
          {loading ? (
            <PulseLoader />
          ) : (
            res?.reference && (
              <p className=" font-normal text-lg">
                {selectedBank}
                {res?.reference}#
              </p>
            )
          )}
        </div>
      </div>

      <div className="mb-[107px]">
        <button
          onClick={() => navigate("/loading")}
          className="w-full h-[60px] bg-[#131313] text-white font-semibold text-[16px] text-center rounded-[8px]"
        >
          I have completed the payment
        </button>
      </div>
    </div>
  );
}

export default Ussd;

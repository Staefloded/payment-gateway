/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from "../ApiHandler";

const base = "wallet";
const basic = "merchant-softpos/core/merchants";

export default {
  getTransactionHistory: (accountNumber, url, page) => {
    let query = url ? `?page=${page || 0}&size=10${url}` : `?page=${page || 0}`;

    return ApiHandler.get(`${base}/core/transactions/history/${accountNumber}${query}`);
  },
  getTransactionById: (accountNumber, transactionId) =>
    ApiHandler.get(`${base}/core/transactions/history/${accountNumber}/single/${transactionId}`),
  initPinReset: () => ApiHandler.get(`${base}/core/account/reset-pin/init?otpMode=email`),
  pinReset: (data) => ApiHandler.post(`${base}/core/account/reset-pin/reset`, data),
  getWithdrawalAccount: () => ApiHandler.get(`${basic}/accounts/withdrawal`),
  createWithdrawalAccount: (data) => ApiHandler.put(`${basic}/accounts/withdrawal`, data),
  withdrawToAccount: (data, merchantId) =>
    ApiHandler.post(`${base}/core/fund/transfer/self-bank`, data, {
      merchantId,
    }),

  getAccounts: (merchantId) =>
    ApiHandler.get(`${base}/core/account`, null, {
      merchantId,
    }),

  getBanksList: () => ApiHandler.get(`${base}/core/banks`),
  claneNameEnquiry: (query, merchantId) =>
    ApiHandler.get(`${base}/core/account/search?query=${query}`, {
      merchantId: merchantId,
    }),
  otherBankNameEnquiry: (data) => ApiHandler.post(`${base}/core/name-enquiry`, data),
  getBeneficaries: (accountNumber) =>
    ApiHandler.get(`${base}/core/users/wallets/${accountNumber}/beneficiaries`),
  createBeneficaries: (accountNumber, data) =>
    ApiHandler.post(`/core/users/wallets/${accountNumber}/beneficiaries`, data),
  deleteBeneficaries: (accountNumber, id) =>
    ApiHandler.delete(`/core/users/wallets/${accountNumber}/beneficiaries/${id}`),
  createCard: (data) => ApiHandler.post("/core/cards/create", data),
  updateCardStatus: (cardId, data) => ApiHandler.put(`/cards/${cardId}/status`, data),
  getCardDetails: (cardId) => ApiHandler.get(`/cards/${cardId}/pin`),
  validatePin: (data) => ApiHandler.post(`${base}/core/account/validate-pin`, data),
  claneTransfer: (data, merchantId) =>
    ApiHandler.post(`${base}/core/fund/transfer/wallet`, data, { merchantId }),
  activateAccount: (data) => ApiHandler.post(`${base}/core/register/activate`, data),
  debitWallet: (data) => ApiHandler.post(`${base}/core/bills/payment/process`, data),
  fundUSSDInit: (data) => ApiHandler.post(`${base}/core/fund/ussd/init`, data),
  getBanks: () => ApiHandler.get(`${base}/core/banks`),
  getPaymentGateway: () => ApiHandler.get(`${base}/core/card-gateway/all?defaultGateway=true`),
  fundWalletViaCard: (data) => ApiHandler.post(`${base}/core/fund/card/init`, data),
  verifyFundWalletViaCard: (data) => ApiHandler.post(`${base}/core/fund/card/verify`, data),
  claneTransferToOtherBank: (data, merchantId) =>
    ApiHandler.post(`${base}/core/fund/transfer/other-banks`, data, {
      merchantId,
    }),
  getBillPayment: (ref) => ApiHandler.get(`${base}/core/admin/bills/payment/${ref}/lookup`),
  getUserCards: (userId, merchantId) =>
    ApiHandler.get(`${base}/core/card-auth/all?defaultCard=${false}`, null, {
      userId,
      merchantId,
    }),
  fundWalletViaSavedCard: (data, userId, merchantId) =>
    ApiHandler.post(`${base}/core/fund/card/saved`, data, { merchantId, userId }),
  getSalesCollectionWallet: (userId) =>
    ApiHandler.get(`${base}/core/merchants/sales-collection/${userId}`),
  getCashOutWallet: (userId) => ApiHandler.get(`${base}/core/merchants/cash-out/${userId}`),
  getFundWallet: (userId) => ApiHandler.get(`${base}/core/merchants/funding/${userId}`),
  getCommission: (data) => ApiHandler.post(`${base}/core/merchants/commission`, data),
  getOtherCommission: (data) => {
    const { merchantId, transactionType, paymentMethod, amount } = data;
    return ApiHandler.get(
      `wallet/core/admin/merchants/transaction/charge?merchantId=${merchantId}&transactionType=${transactionType}&paymentMethod=${paymentMethod}&amount=${amount}`
    );
  },
  personalInformation: (data) => ApiHandler.post(`${basic}/profile/personal`, data),
  businessInformation: (data) => ApiHandler.post(`${basic}/profile/business`, data),
};

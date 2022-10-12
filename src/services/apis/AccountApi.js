/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from '../ApiHandler';
const base = 'core/accounts';
export default {
  getAccountById: (id) => ApiHandler.get(`${base}/${id}`),
  getAccounts: (data) => ApiHandler.post(base, data),
  createAccount: (data) => ApiHandler.post(base, data),
  updateAccount: (data) => ApiHandler.put(`${base}/${data.id}`, data),
  sendContacts: (data) =>
    ApiHandler.post('/authentication/core/users/network', data),
  syncBeneficiaries: (accountNumber, data) =>
    ApiHandler.post(
      `wallet/core/users/wallets/${accountNumber}/sync-beneficiaries`,
      data,
    ),
  getSyncedBeneficiaries: (accountNumber) =>
    ApiHandler.get(
      `wallet/core/users/wallets/${accountNumber}/sync-beneficiaries`,
    ),
  verifyBvn: (data) =>
    ApiHandler.post(`wallet/core/admin/merchants/bvn/verify`, data),
};

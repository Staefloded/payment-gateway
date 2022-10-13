/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from "../ApiHandler";
import Base64 from "../../utils/Base64";
const authURL = "authentication";

const base = "merchant-softpos/core/merchants";
const basic = "merchant-softpos/basic";

export default {
  login: (data) =>
    ApiHandler.post(`${authURL}/provider/auth/token`, data, {
      appDomain: "RAPID",
    }),
  signUp: (data) => ApiHandler.post(`${basic}/merchants/register`, data),
  claneUserSignUp: (data) => ApiHandler.post(`${base}/register`, data),
  getClaneUserProfile: () => ApiHandler.get(`${authURL}/core/profile`),
  documentUpload: (data) => ApiHandler.post(`${base}/files`, data),
  getDocuments: () => ApiHandler.get(`${base}/files`),
  getBusinessCategoryIds: (id) =>
    ApiHandler.get(`${basic}/system/business-categories`, "", {
      Authorization: null,
    }),
  getBanksList: () => ApiHandler.get(`${basic}/system/banks`),
  magicSignup: (data, options) => ApiHandler.post("core/magic/signup", data, options),
  resendVerificationToken: (data) =>
    ApiHandler.post(`${authURL}/basic/auth/account/verification/resend`, data),
  verifyAccount: (data) =>
    ApiHandler.get(`${authURL}/basic/auth/account/verification/${Base64.btoa(data)}`),
  getUserProfile: () => ApiHandler.get(`${base}/profile`),
  getProfile: () => ApiHandler.get(`${authURL}/core/profile`),
  getUserContacts: () => ApiHandler.post(),
  magicLogin: (data) => ApiHandler.post(`${authURL}/core/social-login`, data),
  verifyPhone: (data) => ApiHandler.get(`/authentication/basic/users/${data}`),
  linkMobileNumber: (data) => ApiHandler.post(`${authURL}/basic/users/link-mobile`, data),
  checkEmail: (data) => ApiHandler.get(`${authURL}/basic/users/email-check/${data}`),
  initPasswordReset: (data) =>
    ApiHandler.post(`${authURL}/basic/password/reset/init?otpMode=email`, data),
  resetPassword: (data) => ApiHandler.post(`${authURL}/basic/password/reset`, data),
  checkUsername: (data) => ApiHandler.get(`${authURL}/basic/users/username-check/${data}`),
  updateProfile: (data) =>
    ApiHandler.post(`${authURL}/core/profile`, data, { appChannel: "RAPID" }),
  registerPushTokens: (data) => ApiHandler.post(`messaging/core/users/push-token`, data),
};

/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from '../ApiHandler';
const base = 'core/auth/';
const core = 'core/';
const oauth = 'basic/auth/proof/';
export default {
	proofCode: (data) => ApiHandler.post(`${oauth}code`, data, null),
	proofValidate: (data) => ApiHandler.post(`${oauth}validate`, data, null),
	login: (data, refresh = 0) =>
		ApiHandler.post(`oauth/token?refresh=${refresh}`, data),
	register: (data) => ApiHandler.post(`${base}sign-up`, data),
	changePwd: (data) => ApiHandler.post(`${base}change-password`, data),
	sendOTP: (data) => ApiHandler.post(`${base}send-otp`, data),
	getBVN: (data) => ApiHandler.post(`${core}bvn`, data),
};

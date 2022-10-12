/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from '../ApiHandler';
const base = '/authentication';
export default {
  getToken: (data) => ApiHandler.post(`${base}/provider/auth/token`, data),

};

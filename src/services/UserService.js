/* eslint-disable no-useless-concat */
/* eslint-disable import/no-anonymous-default-export */
import {Cache} from '../utils';
import {ENV} from '../utils';

export default {
	async getBasicToken() {
		return btoa('backoffice' + ':' + 'clane-secret');
	},
	async getAuth() {
		return await Cache.get(ENV.keys.authId);
	},
	async setAuth(auth) {
		await Cache.set(ENV.keys.authId, auth);
	},
	async getDeviceId() {
		return await Cache.get(ENV.keys.deviceId);
	},
	async setDevice(data) {
		await Cache.set(ENV.keys.deviceId, data);
	},
	async getAuthAccessToken() {
		return await Cache.get(ENV.keys.accessId);
	},
	async setAuthAccessToken(token) {
		await Cache.set(ENV.keys.accessId, token);
	},
	async getAuthRefreshToken() {
		return await Cache.get(ENV.keys.refreshId);
	},
	async setAuthRefreshToken(token) {
		await Cache.set(ENV.keys.refreshId, token);
	},
	async setAuthenticateCredentials(data) {
		await this.setAuth(data.userDetails);
		await this.setAuthAccessToken(data.authToken);
	},
	async isLoggedIn() {
		return !!(await this.getAuth());
	},
	async refreshToken(onResponse) {
		return '';
	},
};

/* eslint-disable import/no-anonymous-default-export */
import ApiHandler from '../ApiHandler';
const base = 'core/shortcuts';
const userBase = 'core/users';
export default {
	getAppShortcuts: () => ApiHandler.get(`${base}`),
	getUserShortcuts: (userId) =>
		ApiHandler.get(`${userBase}/${userId}/shortcuts`),
	updateUserShortcuts: (userId, data) =>
		ApiHandler.put(`${userBase}/${userId}/shortcuts`, data),
};

export const reducerActions = {
	setState(state, payload) {
		return {
			...state,
			...payload,
			isServerError: false,
		};
	},
	setError(state, payload) {
		return {
			...state,
			isServerError: payload,
		};
	},
	clear(state, payload = {}) {
		return {
			...state,
			...payload,
		};
	},
};

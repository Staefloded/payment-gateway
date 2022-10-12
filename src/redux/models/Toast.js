export const toast = {
	state: {
		toastContent: {
			name: '',
			message: '',
			id: '',
		},
		toastState: false,
	},
	reducers: {
		toast_content_reducer: (state, payload) => {
			return {
				...state,
				toastContent: payload,
			};
		},
		toast_state_reducer: (state, payload) => {
			return {
				...state,
				toastState: payload,
			};
		},
	},
};

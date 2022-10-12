import storage from 'redux-persist/lib/storage';
import { purgeStoredState } from 'redux-persist';
import { AuthApi } from 'services/apis';
import { reducerActions as reducers } from './reducer';

// const userPermissionHandler = (data) => {
// 	const permissions = Object.values(data).flat();

// 	let permissionsObject = {};
// 	for (var i = 0; i < permissions.length; i++) {
// 		permissionsObject[permissions[i].name] = permissions[i].enabled;
// 	}
// 	return permissionsObject;
// };

export const Auth = {
	state: {
		authState: false,
		isVerified: false,
		access_token: '',
		refresh_token: '',
		userProfile: null,
		userId: '',
		unverifiedEmail: '',
		data: [],
		isSignedUp: false,
		isResend: false,
		isPinSuccess: false,
	},

	reducers,

	effects: (dispatch) => ({
		async fetchToken(data) {
			dispatch.Loader.setState({
				global: true,
			});
			dispatch.RolesModel.setError(false);

			AuthApi.getToken(data)
				.then((res) => {
					dispatch.Auth.setState({
						authState: true,
						access_token: res.data.access_token,
						data: res.data,
						appState: res.data.appStates,
						userType: res.data.userType,
						isStaff: res.data.userType === 'BACKOFFICE_ADMIN' ? true : false,
					});

					dispatch.Loader.setState({
						global: false,
					});

					dispatch.toast.toast_content_reducer({
						name: 'success',
						message: res.data.message,
						id: `success-${res.data.access_token}`,
					});
					dispatch.toast.toast_state_reducer(true);
				})
				.catch((err) => {
					dispatch.RolesModel.setError(true);
					console.log('error:', err);
					dispatch.Loader.setState({
						global: false,
					});

					dispatch.toast.toast_state_reducer(true);

					dispatch.toast.toast_content_reducer({
						name: 'error',
						message: err?.data?.message,
						id: `error-${err.data.access_token}`,
					});

					dispatch.Auth.setState({
						authState: false,
					});
				});
			dispatch.toast.toast_state_reducer(false);
		},
		async signUp(data) {
			dispatch.Loader.setState({
				global: true,
			});
			dispatch.Auth.setError(false);
			AuthApi.signUp(data)
				.then((res) => {
					dispatch.Auth.setState({
						access_token: res.data.access_token,
						refresh_token: res.data.refresh_token,
						expires_in: res.data.expires_in,
						unverifiedEmail: data.businessEmail,
						isSignedUp: true,
					});
				})
				.catch((err) => {
					console.log('error:', err);
					dispatch.toast.toast_state_reducer(true);

					dispatch.toast.toast_content_reducer({
						name: 'error',
						message: err?.data?.message,
						id: `error-${err.data.access_token}`,
					});
				})
				.finally(() =>
					dispatch.Loader.setState({
						global: false,
					})
				);

			dispatch.toast.toast_state_reducer(false);
		},
		async resendVerificationCode(data) {
			dispatch.Loader.setState({
				global: true,
			});
			dispatch.Auth.setError(false);
			AuthApi.resendVerificationToken(data)
				.then((res) => {
					dispatch.Auth.setState({
						isResend: true,
					});

					setTimeout(() => {
						dispatch.Auth.setState({
							isResend: false,
						});
					}, 3000);
				})
				.catch((err) => {
					console.log('error:', err);
					dispatch.toast.toast_state_reducer(true);

					dispatch.toast.toast_content_reducer({
						name: 'error',
						message: err?.data?.message,
						id: `error-resendverify`,
					});
				})
				.finally(() =>
					dispatch.Loader.setState({
						global: false,
					})
				);

			dispatch.toast.toast_state_reducer(false);
		},
		async VerifyAccount(data) {
			dispatch.Loader.setState({
				global: true,
			});
			dispatch.Auth.setError(false);
			AuthApi.verifyAccount(data)
				.then((res) => {
					dispatch.Auth.setState({
						isResend: false,
						isSignedUp: false,
						isPinSuccess: true,
					});

					// this.getUserProfile();
				})
				.catch((err) => {
					console.log('error:', err);
					dispatch.toast.toast_state_reducer(true);

					dispatch.toast.toast_content_reducer({
						name: 'error',
						message: err?.data?.message,
						id: `error-verifyaccount`,
					});
				})
				.finally(() =>
					dispatch.Loader.setState({
						global: false,
					})
				);

			dispatch.toast.toast_state_reducer(false);
		},
		async getUserProfile() {
			dispatch.Loader.setState({
				global: true,
			});
			dispatch.Auth.setError(false);
			AuthApi.getUserProfile()
				.then((res) => {
					let profile;

					profile = res.data;
					AuthApi.getProfile()
						.then((res) => {
							dispatch.Auth.setState({
								userId: profile?.data?.id,
								userProfile: { ...profile?.data, ...res.data },
								authState: true,
							});
						})
						.catch((err) => {
							throw new Error(err.data.message);
						});
				})
				.catch((err) => {
					console.log('error:', err);
					dispatch.toast.toast_state_reducer(true);

					dispatch.toast.toast_content_reducer({
						name: 'error',
						message: err?.data?.message,
						id: `error-getprofile`,
					});
				})
				.finally(() =>
					dispatch.Loader.setState({
						global: false,
					})
				);

			dispatch.toast.toast_state_reducer(false);
		},
		logout() {
			purgeStoredState({
				storage,
				key: 'root',
			});

			dispatch({ type: 'RESET_APP' });
		},
	}),
};

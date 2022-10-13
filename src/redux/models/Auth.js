import storage from "redux-persist/lib/storage";
import { purgeStoredState } from "redux-persist";
import { AuthApi } from "services/apis";
import { reducerActions as reducers } from "./reducer";

export const Auth = {
  state: {
    authState: false,
    isVerified: false,
    access_token: "",
    refresh_token: "",
    userProfile: null,
    userId: "",
    unverifiedEmail: "",
    data: [],
    isSignedUp: false,
    isResend: false,
    isPinSuccess: false,
  },

  reducers,

  effects: (dispatch) => ({
    async login(data, state) {
      const { email, password } = data;
      dispatch.Loader.setState({
        global: true,
      });
      dispatch.Auth.setError(false);

      try {
        let merchantData = {
          email,
          password,
        };
        merchantData.grantType = "password";
        const res = await AuthApi.login(merchantData);

        let { data } = res;
        await dispatch.Auth.setState({
          ...state.Auth,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        dispatch.toast.toast_state_reducer(true);

        dispatch.toast.toast_content_reducer({
          name: "success",
          message: res.message,
          id: `success-${res.data.access_token}`,
        });

        if (res.code === 200) {
          const profile = await this.getUserProfile();
          await dispatch.Wallet.getAccounts(profile.id);
          await dispatch.Wallet.getVirtualWallets();

          dispatch.Loader.setState({
            global: false,
          });

          dispatch.Loader.setState({
            global: false,
          });
        }

        return res;
      } catch (err) {
        this.handleError(err);

        dispatch.Auth.setState({
          authState: false,
        });
      } finally {
        dispatch.toast.toast_state_reducer(false);
      }
    },

    async getUserProfile(_, state) {
      dispatch.Auth.setError(false);
      try {
        let res = await AuthApi.getUserProfile();
        const profileData = await AuthApi.getProfile();
        //TODO:  replace with merchant ID also
        let data = res.data;

        if (data) {
          await dispatch.Auth.setState({
            userId: profileData?.data?.id,
            userProfile: { ...profileData?.data, ...data },
          });
        }

        return data;
      } catch (e) {
        this.handleError(e);
      } finally {
        dispatch.toast.toast_state_reducer(false);
      }
    },

    async handleError(error, state) {
      dispatch.Auth.setError(true);
      dispatch.Loader.setState({
        global: false,
      });
      dispatch.toast.toast_state_reducer(true);

      if (!error?.isNetworkError || error?.data?.Message) {
        var message =
          error?.data.message || error?.message || "An error occured. Please try again.";

        dispatch.toast.toast_content_reducer({
          name: "error",
          message: message,
          id: `error-${message}`,
        });

        throw error;
      }

      dispatch.toast.toast_content_reducer({
        name: "error",
        message: message,
        id: `error-${message}`,
      });
      throw error;
    },

    logout() {
      purgeStoredState({
        storage,
        key: "root",
      });

      dispatch({ type: "RESET_APP" });
    },
  }),
};

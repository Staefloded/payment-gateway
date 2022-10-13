import moment from "moment";
import { reducerActions as reducers } from "./reducer";
import { WalletApi, AccountApi } from "../../services/apis";
import { ussdBanks } from "constants/ussdBanks";

const IsState = {
  isServerError: false,
  isLoading: false,
  accounts: {},
  transactionsHistory: {},
  moreTransactionsHistory: [],
  searchData: null,
  beneficiaries: [],
  defaultCard: null,
  cardColor: 0,
  cards: [],
  banks: [],
  ussdBanks: [],
  gateways: [],
  ussdUsedBanks: [],
  isDefault: false,
  nearbyUser: null,
  isNearby: false,
  selectedBeneficiary: null,
  timeActive: moment().format("DD/MM/YYYY HH:mm:ss"),
  walletProfile: {},
  merchantAccount: {},
  salesCollectionWallet: null,
  cashoutWallet: null,
  fundWallet: null,
  commission: {},
  salesCollectionCount: 0,
};

export const Wallet = {
  name: "Wallet",
  state: IsState,
  reducers,
  effects: (dispatch) => ({
    async getAccounts(data, state) {
      dispatch.Wallet.setError(false);

      dispatch.Auth.setError(false);

      try {
        let responseData = await WalletApi.getAccounts(data);

        if (responseData) {
          await dispatch.Wallet.setState({
            accounts: responseData.data.accounts[0],
            walletProfile: responseData.data.walletProfile,
          });
          return true;
        }
      } catch (e) {
        this.handleError(e);
        return e;
      } finally {
        dispatch.toast.toast_state_reducer(false);
      }
    },

    async getTransactionHistory({ accountNumber, url, page }, state) {
      dispatch.Wallet.setError(false);
      await dispatch.Wallet.setState({ isLoading: true });
      try {
        const responseData = await WalletApi.getTransactionHistory(accountNumber, url, page);

        if (responseData && typeof responseData === "object") {
          const { data } = responseData;
          await dispatch.Wallet.setState({
            ...state.Wallet,
            transactionsHistory: data,
          });
          await dispatch.Wallet.setState({ isLoading: false });
        } else {
          await dispatch.Wallet.setState({
            ...state.Wallet,
            transactionsHistory: [],
          });
          await dispatch.Wallet.setState({ isLoading: false });
        }
        return responseData.data;
      } catch (e) {
        dispatch.Wallet.setState({ isLoading: false });
        this.handleError(e);
      }
    },

    async getVirtualWallets(payload, state) {
      dispatch.Wallet.setError(false);
      try {
        const userId = await state.Auth.userId;

        const salesResponse = await WalletApi.getSalesCollectionWallet(userId);
        const fundWalletResponse = await WalletApi.getFundWallet(userId);

        await dispatch.Wallet.setState({
          ...state.Wallet,
          salesCollectionWallet: salesResponse,
          fundWallet: fundWalletResponse,
        });

        return { sales: salesResponse };
      } catch (error) {
        dispatch.Wallet.setError(true);
        this.handleError(error);
        throw error;
      }
    },

    async getCommission(data, state) {
      dispatch.Wallet.setError(false);
      try {
        const response = await WalletApi.getCommission(data);
        await dispatch.Wallet.setState({
          commission: response,
        });

        return response;
      } catch (error) {
        dispatch.Wallet.setError(true);
        this.handleError(error);
        throw error;
      }
    },

    async getBanks() {
      try {
        let { data } = await WalletApi.getBanks();
        if (data) {
          await dispatch.Wallet.setState({
            banks: data.banks.sort((a, b) => (a.name > b.name ? 1 : -1)),
            ussdUsedBanks: ussdBanks,
            ussdBanks: ussdBanks?.map((item) => ({
              label: item.name,
              value: item.ussd,
            })),
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async fundWalletUssdInit(payload, state) {
      dispatch.Wallet.setError(false);
      const { merchantId } = state.Wallet.walletProfile;

      payload = {
        transactionType: payload.transactionType,
        accountNumber: payload.accountNumber,
        amount: payload.transferAmount || "100",
        note: "",
      };

      try {
        let responseData = await WalletApi.fundUSSDInit(payload, merchantId);

        if (responseData) {
          return responseData.data;
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    async handleError(error, state) {
      dispatch.Wallet.setError(true);
      dispatch.Loader.setState({
        global: false,
      });
      dispatch.toast.toast_state_reducer(true);
      if (!state.Wallet.walletProfile || !state.Wallet.accounts) return;
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
  }),
};

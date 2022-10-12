import {AccountApi} from '../../services/apis';
import {reducerActions as reducers} from './reducer';
import {ENV, DB} from '../../utils';

const IState = {
  isServerError: false,
  account: {},
  lookupUserAcc: {},
  accounts: [],
};
export const Account = {
  name: 'Account',
  state: IState,
  reducers,
  effects: (dispatch) => ({
    async getAccountById(id) {
      dispatch.Account.setError(false);
      try {
        const {data} = ENV.demo
          ? {data: DB.account}
          : await AccountApi.getAccountById(id);
        console.log({account: data});
        if (data) {
          dispatch.Account.setState({account: data});
        }
      } catch (error) {
        console.log(error);
        dispatch.Account.setError(true);
      }
    },
  }),
};

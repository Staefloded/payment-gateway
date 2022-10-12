import createLoadingPlugin from '@rematch/loading';
import {getModelKeys} from '../../utils';
import {Account} from '../models';

export const loadingPlugin = createLoadingPlugin({
  whitelist: [...getModelKeys(Account)],
});

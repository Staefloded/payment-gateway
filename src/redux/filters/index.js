import {createFilter} from 'redux-persist-transform-filter';

const AccountFilter = createFilter('Account', ['accountInfo', 'userBankAcc']);

const AppStateFilter = createFilter('AppState', [
  'messages',
  'language',
  'languages',
  'device',
  'appMode',
  'appColors',
  'appModeState',
  'statusBgColor', 
  'statusBarStyle',
  'noDelay',
  'addDelay',
]);

const OauthFilter = createFilter('Oauth', [
  'authDetails',
  'authLogin',
  'isTouchId',
  'pin',
  'token',
  'firebaseUID',
  'fireBaseAuth',
  'access_token',
  'expires_in',
  'refresh_token',
  'last_log_in',
  'lastTokenGenerationTime',
  'userLogout',
  'last_log_in_role',
  'consumerUser',
  'merchantUser',
]);

const ShortcutsFilter = createFilter('Shortcuts', [
  'shortcuts',
  'userShortcuts',
]);
const SystemFilter = createFilter('System', ['banks', 'countries']);

export const AllFilters = [
  AccountFilter,
  AppStateFilter,
  OauthFilter,
  ShortcutsFilter,
  SystemFilter,
];

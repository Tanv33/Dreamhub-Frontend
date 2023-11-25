import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import dreamhubGif from "../src/assets/images/loaderGIf.gif";

const APP_NAME = "Dreamhub App";
const APP_LOGO_URL = dreamhubGif;
const DEFAULT_ETH_JSONRPC_URL = "https://rpc.testnet.fantom.network";
const DEFAULT_CHAIN_ID = 4002;
export const coinbaseWalletInstance = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});
// Initialize a Web3 Provider object
export const coinBaseEthereum = coinbaseWalletInstance.makeWeb3Provider(
  DEFAULT_ETH_JSONRPC_URL,
  DEFAULT_CHAIN_ID
);

// user loader true

// deploy https://dreamhub-backend.herokuapp.com/api

import Web3 from "web3";
import {
  coinBaseEthereum,
  coinbaseWalletInstance,
} from "../../coinbase-config";
import { BASE_URL, CHAIN_ID } from "../../constants";
import { ContractHelper } from "./contractHelper";
import { getSignedInUserData } from "./user-task";
import { web3WithProvider } from "./../../web3-provider";
import { getCurrentProvider } from "./../../web3-provider";
const web3 = new Web3(Web3.givenProvider);

function walletLoader(bool) {
  return (dispatch) => {
    dispatch(walletLoaderBool(bool));
  };
}

export const WALLET_LOADER = "WALLET_LOADER";
export const walletLoaderBool = (bool) => {
  return {
    type: WALLET_LOADER,
    payload: bool,
  };
};

// connectWallet
export function connectWallet(
  networkId,
  navigate,
  alert,
  alertText,
  currentAccount
) {
  return async (dispatch) => {
    console.log("runnnnnnnnnnnnnnnnn");

    dispatch(walletLoader(true));
    if (currentAccount) {
      var axios = require("axios");
      var data = {
        username: `${currentAccount}`,
        type: "User",
      };

      var config = {
        method: "post",
        url: `${BASE_URL}/api/v1/auth/register`,
        headers: {},
        data: data,
      };
      console.log("calling sign in api");
      axios(config)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("accountAddress", currentAccount);
          localStorage.setItem("walletType", "metaMask");
          alert.success(alertText);
          console.log(currentAccount, response.data.token, response.data.user);
          // dispatch(
          //   getConnectWalletSuccess(
          //     currentAccount,
          //     response.data.token,
          //     response.data.user
          //   )
          // );
          // dispatch(getSignedInUserData(response.data.user));
          // setTimeout(() => {
            console.log("Loader off");
            // dispatch(walletLoader(false));
            navigate(`/authors-02/auther?id=${response?.data?.user?._id}`);
          // }, 2000);
        })
        .catch(function (error) {
          alert.error("Can't connect, please try again!");
          // dispatch(walletLoader(false));
          console.log(error);
        });
    }
  };
}
export function wallet_connect(
  WalletConnect,
  QRCodeModal,
  navigate,
  alert,
  alertText,
  setSearch
) {
  return async (dispatch) => {
    dispatch(walletLoader(true));
    console.log("WalletConnect");
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
      // NetworkName: "Fantom testnet",
      // ChainId: 4002,
      // ssl: "https://rpc.testnet.fantom.network/",
    });
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
      console.log("create session");
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log("connect", { accounts, chainId });
      // accounts[0];
      if (accounts[0]) {
        var axios = require("axios");
        var data = {
          username: `${accounts[0]}`,
          type: "User",
        };

        var config = {
          method: "post",
          url: `${BASE_URL}/api/v1/auth/register`,
          headers: {},
          data: data,
        };
        console.log("calling sign in api");
        axios(config)
          .then(function (response) {
            console.log(response);
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("accountAddress", accounts[0]);
            localStorage.setItem("walletType", "walletConnect");
            alert.success(alertText);
            dispatch(walletLoader(false));
            console.log(accounts[0], response.data.token, response.data.user);
            dispatch(
              getConnectWalletSuccess(
                accounts[0],
                response.data.token,
                response.data.user
              )
            );
            setTimeout(() => {
              // navigate(`/authors-02/${response?.data?.user?._id}`);
              navigate(`/authors-02/auther?id=${response?.data?.user?._id}`);
            }, 2000);
          })
          .catch(function (error) {
            alert.error("Can't connect, please try again!");
            dispatch(walletLoader(false));
            console.log(error);
          });
      }
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      if (payload) {
        console.log("Yes payload", payload);
      } else {
        console.log("No payload", payload);
      }
      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0];
      // console.log("session_update", { accounts, chainId });
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // if (payload) {
      //   console.log("Yes payload", payload);
      // } else {
      //   console.log("No payload", payload);
      // }

      // Delete connector
      const { accounts, chainId } = payload.params[0];

      console.log("disconnect", { accounts, chainId });
      console.log("runnnnnnn logout");
      localStorage.removeItem("accountAddress");
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      localStorage.removeItem("walletType");
      dispatch(getConnectWalletSuccess(false, false, false));
      if (setSearch) {
        setSearch(false);
      }
      navigate("/");
    });
  };
}
export function coinbaseWallet(navigate, alert, alertText, setSearch) {
  return async (dispatch) => {
    dispatch(walletLoader(true));
    console.log("coinbaseWallet");
    let accounts = false;
    const web3 = new Web3(coinBaseEthereum);
    accounts = await new Promise((resolve, reject) => {
      coinBaseEthereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {
          accounts = response;
          console.log(`User's address is ${response[0]}`);
          resolve(accounts);
        });
    });
    if (accounts[0]) {
      var axios = require("axios");
      var data = {
        username: `${accounts[0]}`,
        type: "User",
      };

      var config = {
        method: "post",
        url: `${BASE_URL}/api/v1/auth/register`,
        headers: {},
        data: data,
      };
      console.log("calling sign in api");
      axios(config)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("accountAddress", accounts[0]);
          localStorage.setItem("walletType", "coinBaseWallet");
          alert.success(alertText);
          dispatch(walletLoader(false));
          console.log(accounts[0], response.data.token, response.data.user);
          dispatch(
            getConnectWalletSuccess(
              accounts[0],
              response.data.token,
              response.data.user
            )
          );
          setTimeout(() => {
            // navigate(`/authors-02/${response?.data?.user?._id}`);
            navigate(`/authors-02/auther?id=${response?.data?.user?._id}`);
          }, 2000);
        })
        .catch(function (error) {
          alert.error("Can't connect, please try again!");
          dispatch(walletLoader(false));
          console.log(error);
        });
    }
  };
}
export const GET_EXPENSE = "GET_EXPENSE";
export const connectWalletSuccess = (data, page) => ({
  type: GET_EXPENSE,
  payload: { data, page },
});

// changeWallet
export function changeWallet(
  navigate,
  alert,
  alertText,
  currentAccount,
  redirect
) {
  return async (dispatch) => {
    dispatch(walletLoader(true));
    if (currentAccount) {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = localStorage.getItem('userToken')
      var axios = require("axios");
      var data;
      
      if (user && user.email) {
        data = {
          preferred_method: 'Email',
          metaAddress: `${currentAccount}`,
          // type: "User"
          userId: user._id
        };
      } else {
        data = {
          preferred_method: 'MetaMask',
          username: `${currentAccount}`,
          type: "User"
        };

      }
      var config = {
        method: "post",
        url: `${BASE_URL}/api/v1/auth/register`,
        // headers: {},/
        data: data,
      };

      // var 
      console.log("calling sign in api");
      axios(config)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("accountAddress", currentAccount);
          localStorage.setItem("walletType", "metaMask");
          alert.success(alertText);
          dispatch(walletLoader(false));
          console.log(
            currentAccount,
            response.data.token,
            response.data.user,
            "useruseruser"
          );
          dispatch(
            getConnectWalletSuccess(
              currentAccount,
              response.data.token,
              response.data.user
            )
          );
          dispatch(getSignedInUserData(response.data.user));
          setTimeout(() => {
            dispatch(walletLoader(false));
            if (redirect) {
              navigate(`/item-details-02/${redirect}`);
            } else {
              navigate(`/authors-02/auther?id=${response?.data?.user?._id}`);
            }
          }, 2000);
        })
        .catch(function (error) {
          alert.error("Can't connect, please try again!");
          dispatch(walletLoader(false));
          console.log(error);
        });
    }
  };
}

// changeWallet
export function connectWalletToEmail(
  navigate,
  alert,
  alertText,
  currentAccount
) {
  return async (dispatch) => {
    dispatch(walletLoader(true));
    let token = localStorage.getItem("userToken");
    if (currentAccount && token) {
      var axios = require("axios");

      var config = {
        method: "get",
        url: `${BASE_URL}/api/v1/auth/register/metamask/${currentAccount}`,
        headers: {
          token: token,
        },
      };
      console.log("calling sign in api");
      axios(config)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("accountAddress", currentAccount);
          alert.success(alertText);
          dispatch(walletLoader(false));
          console.log(
            currentAccount,
            response.data.token,
            response.data.user,
            "useruseruser"
          );
          dispatch(
            getConnectWalletSuccess(
              currentAccount,
              response.data.token,
              response.data.user
            )
          );
          dispatch(getSignedInUserData(response.data.user));
          setTimeout(() => {
            dispatch(walletLoader(false));

            navigate(`/authors-02/auther?id=${response?.data?.user?._id}`);
          }, 2000);
        })
        .catch(function (error) {
          alert.error("Can't connect, please try again!");
          dispatch(walletLoader(false));
          console.log(error);
        });
    }
  };
}

//logout
export function logout(navigate, setSearch, connector) {
  return async (dispatch) => {
    const walletType = localStorage.getItem("walletType");

    if (walletType === "metaMask") {
      // window.ethereum.on("disconnect", (err, asda) =>
      //   console.log({ err, asda })
      // );
      // window.ethereum.close();
    }
    if (walletType === "walletConnect") {
      if (connector) {
        connector.killSession();
      }
    }
    if (walletType === "coinBaseWallet") {
      console.log("coinBaseWallet");
      coinbaseWalletInstance.disconnect();
      // coinBaseEthereum.disconnect();
    }
    console.log("runnnnnnn logout");
    localStorage.removeItem("accountAddress");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("walletType");
    // window.ethereum.on("disconnect", "0x0");
    dispatch(getConnectWalletSuccess(false, false, false));
    if (setSearch) {
      setSearch(false);
    }
    navigate("/");
  };
}

// //logout
// export function disconnectWallet(navigate) {
//   return  (dispatch) => {

//   };
// }

//Get Expense
export function getConnectWallet() {
  return (dispatch) => {
    console.log("runnnnnnn getConnectWallet");
    let account = localStorage.getItem("accountAddress");
    let userToken = localStorage.getItem("userToken");
    let user = localStorage.getItem("user");
    if (account) {
      dispatch(getConnectWalletSuccess(account, userToken, JSON.parse(user)));
    }
  };
}
export const GET_CONNECTED_WALLET = "GET_CONNECTED_WALLET";
export const getConnectWalletSuccess = (account, userToken, user) => {
  console.log(account, userToken, user);
  return {
    type: GET_CONNECTED_WALLET,
    payload: { account: account, userToken: userToken, user: user },
  };
};

export const changeNetwork = async () => {
  const currentProvider = await getCurrentProvider();
  if (currentProvider?.networkVersion !== CHAIN_ID) {
    try {
      await currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(CHAIN_ID) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Fantom testnet",
              chainId: web3.utils.toHex(CHAIN_ID),
              nativeCurrency: { name: "FTM", decimals: 18, symbol: "FTM" },
              rpcUrls: ["https://rpc.testnet.fantom.network/"],
            },
          ],
        });
      }
    }
  } else {
    return true;
  }
};

// Set Connector
export function setConnector(connector) {
  return (dispatch) => {
    dispatch(setConnectorSuccess(connector));
    console.log("setConnector");
  };
}

export const SET_CONNECTOR = "SET_CONNECTOR";
export const setConnectorSuccess = (connector) => ({
  type: SET_CONNECTOR,
  payload: { connector },
});

// Set Connector
export function getWalletBalance(accountAddress) {
  return async (dispatch) => {
    const web3 = await web3WithProvider();
    web3.eth.getBalance(accountAddress).then((a) => {
      var amountToSend = Number(a);
      console.log({ amountToSend });
      // var weiAmout = amountToSend * 1e18;
      // var weiAmount2 = web3.toWei(amountToSend);
      // var fairPrice = Number(String(weiAmout).split("e")[0]).toFixed(4);
      var fairPrice = web3.utils.fromWei(String(amountToSend), "ether");
      console.log(fairPrice, "weiAmout");
      dispatch(getWalletBalanceData(fairPrice));
    });
  };
}

export const WALLET_BALANCE = "WALLET_BALANCE";
export const getWalletBalanceData = (a) => ({
  type: WALLET_BALANCE,
  payload: a,
});

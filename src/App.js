import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import routes from "./pages/index";
import { connect, useDispatch, useSelector, useStore } from "react-redux";
import { useEffect, useState } from "react";
import "./pages/loader.css";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  useAlert,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import {
  changeNetwork,
  changeWallet,
  connectWallet,
  disconnectWallet,
  getConnectWallet,
  getConnectWalletSuccess,
  setConnector,
  logout,
  connectWalletToEmail,
  getWalletBalance,
} from "./module/action/wallet";
import store from "./store";
import { CHAIN_ID } from "./constants";
import NetworkModal from "./components/layouts/NetworkModal";
import { getNFTSOnSell, getSignedInUser } from "./module/action/user-task";
import { QRCodeModal } from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { bindActionCreators } from "redux";
import { metaMaskProvider } from "./web3-provider";
import { ParticleComponent } from "./pages/ParticleComponent";
import loaderGif from './assets/images/loaderGIf.webm'
function App(props) {
  // useEffect(async () => {
  //   //  Create WalletConnect Provider
  //   const provider = new WalletConnectProvider({
  //     rpc: {
  //       1: "https://rpc.ftm.tools/",
  //       // 3: "https://cointool.app/rpcServer/ftm",
  //       // 3: "https://ropsten.mycustomnode.com",
  //       // 100: "https://dai.poa.network",
  //       // ...
  //     },
  //   });

  //   //  Enable session (triggers QR Code modal)
  //   await provider.enable();
  //   console.log({ provider: provider });

  //   return () => {};
  // }, []);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let alert = useAlert();
  const [loaderState, setLoaderState] = useState(true);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const hideNetworkModal = () => {
    setShowNetworkModal(false);
  };
  const signedInUser = useSelector((e) => e.User.signedInUser);
  const token = useSelector((e) => e.wallet.token)

  const checkConnection = () => {
    dispatch(logout(navigate, false));
  };
  // WalletConnect
  useEffect(() => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // Check if connection is already established
    props.setConnector(connector);
    if (!connector.connected) {
      // create new session
      connector.createSession();
      console.log("no connector established");
    } else {
      props.setConnector(connector);
      console.log("connector connected", connector);
    }
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
      const { accounts, chainId } = payload.params[0];

      console.log("disconnect", { accounts, chainId });
      console.log("runnnnnnn logout");
      localStorage.removeItem("accountAddress");
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      localStorage.removeItem("walletType");
      dispatch(getConnectWalletSuccess(false, false, false));
      // if (setSearch) {
      //   setSearch(false);
      // }
      navigate("/");
    });

    // dispatch(connector);
  }, []);

  useEffect(() => {
    // // changeNetwork();
    // console.log(window?.ethereum?.networkVersion, CHAIN_ID);
    // if (
    //   window?.ethereum?.networkVersion !== CHAIN_ID &&
    //   window?.ethereum?.networkVersion != null
    // ) {
    //   // setShowNetworkModal(true);
    //   // setHideNetworkModal(false);
    // }
    // dispatch(getConnectWallet());
    dispatch(getSignedInUser());
    console.log(store.getState());
  }, []);

  useEffect(async () => {
    if (!window.ethereum) {
      return;
    }
    let accountNumber;
    const accountWasChanged = (accounts) => {
      dispatch(getNFTSOnSell());
      if (!accounts[0]) {
        checkConnection();
      } else if (accounts[0]) {
        accountNumber = accounts[0];
        if (
          window.location.pathname.split("/")[1] === "wallet-connect" &&
          window.location.pathname.split("/")[2]
        ) {
          console.log('ifffff')
          // let userToken = localStorage.getItem('userToken')
          dispatch(
            changeWallet(
              navigate,
              alert,
              "Your Wallet Has Been Connected.",
              accounts[0],
              window.location.pathname.split("/")[2]
            )
          );
        } else {
          console.log('elseeee')
          dispatch(
            changeWallet(
              navigate,
              alert,
              "Your Wallet Has Been Connected.",
              accounts[0],
              false
            )
          );
        }
      }
      console.log("accountWasChanged");
    };
    const chainChange = (chainId) => {
      // dispatch(getWalletBalance(accountNumber))
      console.log({ chainId });
      if (chainId === "0xfa2" || chainId === "4002") {
        setShowNetworkModal(false);
      } else {
        console.log("Please change chain to Fantom Testnet");
        setShowNetworkModal(true);
      }
    };
    const metaProvider = await metaMaskProvider();
    metaProvider.on("accountsChanged", accountWasChanged);
    metaProvider.on("chainChanged", chainChange);

    return () => {
      // if(metaProvider){
      metaProvider.off("accountsChanged", accountWasChanged);
      metaProvider.off("chainChanged", chainChange);
      // }
    };
  }, []);

  useEffect(() => {
    // console.log('rnnn')
    document.fonts.ready.then(function () {
      setTimeout(() => {
        setLoaderState(false);
      }, 1500);
    });
  }, []);

  return (
    <>
      {loaderState ? (
        <div className="loaderDiv">
          <div className="loader">
            <video autoPlay loop muted>
              <source src={loaderGif} />
            </video>
          </div>
        </div>
      ) : (
        <>
          <NetworkModal show={showNetworkModal} onHide={hideNetworkModal} />
          {/* <ParticleComponent /> */}
          <Routes>
            {routes.map((data, index) => {
              return (
                <Route
                  onUpdate={() => window.scrollTo(0, 0)}
                  exact={true}
                  path={data.path}
                  element={data.component}
                  key={index}
                />
              );
            })}
          </Routes>
        </>
      )}
    </>
  );
}

// export default App;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setConnector,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);

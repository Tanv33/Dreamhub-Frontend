import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/HeaderStyle2";
import Footer from "../footer/Footer";
import metamask from "../../assets/images/MetaMask.png";
import walletConnect from "../../assets/images/walletConnect.svg";
import walletConnectPng from "../../assets/images/walletConnectPng.png";
import coinBaseWallet from "../../assets/images/coinBaseWallet.svg";
import phantomWallet from "../../assets/images/phantom.svg";
import bloctoWallet from "../../assets/images/blocto.svg";
import { connect, useDispatch } from "react-redux";
import {
  changeWallet,
  coinbaseWallet,
  connectWallet,
  wallet_connect,
} from "../../module/action/wallet";
import { useWeb3Context } from "web3-react";
import { bindActionCreators } from "redux";
import connectImage1 from "../../assets/connectImage1.png";
import connectImage2 from "../../assets/connectImage2.png";
import connectImage3 from "../../assets/connectImage3.png";
import HeaderNew from "../header/HeaderNew";
import DarkMode from "../header/DarkMode";
import logodark from "../../assets/images/logo/logodream.svg";
import { ParticleComponent } from "../../pages/ParticleComponent";
import { useAlert } from "react-alert";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { getConnectedAdress } from "../../module/action/user-task";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import dreamhubGif from "../../assets/images/loaderGIf.gif";
import { coinBaseEthereum } from "../../coinbase-config";
import { metaMaskProvider } from "../../web3-provider";
const ConnectWallet = (props) => {
  const [data, setData] = useState([
    // connectImage1,
    // connectImage2,
    connectImage3,
  ]);
  const { networkId } = useWeb3Context();
  const [random, setRandom] = useState(0);
  // const [connectWalletState, setConnectWalletState] = useState(false);

  const [image, setImage] = useState("");
  const [activeTab, setActiveTab] = useState("Ethereum");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let alert = useAlert();
  const connectWalletFn = () => {
    // console.log("count connect wallet 88");
    // props.connectWallet(
    //   networkId,
    //   navigate,
    //   alert,
    //   "Your Wallet Has Been Connected."
    // );
  };

  const walletConnectFunc = (params) => {
    props.wallet_connect(
      WalletConnect,
      QRCodeModal,
      navigate,
      alert,
      "Your Wallet Has Been Connected.",
      props.setSearch
    );
  };

  // useEffect(async () => {
  //   if (connectWalletState) {
  //     if (!window.ethereum) {
  //       return;
  //     }
  //     const metaProvider = await metaMaskProvider();
  //     metaProvider
  //       .request({ method: "eth_accounts" })
  //       .then((data) => {
  //         if (data[0]?.length) {
  //           // metaProvider
  //           //   .request({
  //           //     method: "wallet_requestPermissions",
  //           //     params: [
  //           //       {
  //           //         eth_accounts: {},
  //           //       },
  //           //     ],
  //           //   })
  //           //   .then((success) => {
  //           metaProvider
  //             .request({
  //               method: "eth_requestAccounts",
  //             })
  //             .then((accounts) => {
  //               if (accounts[0].length) {
  //                 dispatch(
  //                   changeWallet(
  //                     navigate,
  //                     alert,
  //                     "Your Wallet Has Been Connected.",
  //                     accounts[0],
  //                     window.location.pathname.split("/")[2]
  //                   )
  //                 );
  //               }
  //               // })
  //             })
  //             .catch(console.error);
  //           return;
  //         } else {
  //           console.log("not connected");
  //           metaProvider
  //             .request({
  //               method: "eth_requestAccounts",
  //             })
  //             .then((accounts) => {})
  //             .catch(console.error);
  //           return;
  //         }
  //       })
  //       .catch(console.error);
  //   }
  // }, [connectWalletState]);
  const connectMetaMaskFunc = async () => {
    console.log("sadasd");
    if (!window.ethereum) {
      return;
    }
    const metaProvider = await metaMaskProvider();
    metaProvider
      .request({ method: "eth_accounts" })
      .then((data) => {
        if (data[0]?.length) {
          // metaProvider
          //   .request({
          //     method: "wallet_requestPermissions",
          //     params: [
          //       {
          //         eth_accounts: {},
          //       },
          //     ],
          //   })
          //   .then((success) => {
          metaProvider
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => {
              if (accounts[0].length) {
                dispatch(
                  changeWallet(
                    navigate,
                    alert,
                    "Your Wallet Has Been Connected.",
                    accounts[0],
                    window.location.pathname.split("/")[2]
                  )
                );
              }
              // })
            })
            .catch(console.error);
          return;
        } else {
          console.log("not connected");
          metaProvider
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => {})
            .catch(console.error);
          return;
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    const min = 0;
    const max = 2;
    const rand = min + Math.random() * (max - min);
    let i = Math.round(random + rand);
    setImage(data[0]);
  }, []);

  const coinBaseWalletFunc = (params) => {
    props.coinbaseWallet(
      navigate,
      alert,
      "Your Wallet Has Been Connected.",
      props.setSearch
    );
  };
  return (
    <div>
      {/* <ParticleComponent /> */}

      <div></div>
      {/* <HeaderNew  search={true} setSearch={false} /> */}
      <div style={{ display: "none" }}>
        <DarkMode />
      </div>
      <div className="tf-connect-wallet tf-section">
        <img
          src={logodark}
          className="connectPageLogo"
          onClick={() => navigate("/")}
        />

        <div className="themesflat-container">
          <div className="row">
            <div className="leftImageCol">
              <div
                className="leftImage"
                style={{ backgroundImage: `url('${image}')` }}
              ></div>
            </div>
            <div className="buttonArea">
              <div className="connectDiv">
                <div>
                  <h2 className="tf-title-heading  style-2 mg-bt-12">
                    Connect wallet
                  </h2>
                  <h5 className="sub-title connectText style-1 mg-bt-12">
                    Choose how you want to connect. There are several 
                    <br /> wallet providers.
                  </h5>
                  <div className="walletTabsDiv">
                    <div className="walletTabs">
                      <div
                        onClick={() => setActiveTab("Ethereum")}
                        className={
                          activeTab === "Ethereum"
                            ? "sub-title tabs active"
                            : "sub-title tabs"
                        }
                      >
                        Ethereum
                      </div>
                      <div
                        onClick={() => setActiveTab("Polygon")}
                        className={
                          activeTab === "Polygon"
                            ? "sub-title tabs active"
                            : "sub-title tabs"
                        }
                      >
                        Polygon
                      </div>
                      <div
                        // onClick={() => setActiveTab("Tezos")}
                        style={{cursor:'pointer'}}
                        className={
                          activeTab === "Tezos"
                            ? "sub-title tabs active"
                            : "sub-title tabs"
                        }
                      >
                        Tezos <sub>(Coming Soon)</sub>
                      </div>
                      <div
                        // onClick={() => setActiveTab("Flow")}
                        style={{cursor:'pointer'}}
                        className={
                          activeTab === "Flow"
                            ? "sub-title tabs active"
                            : "sub-title tabs"
                        }
                      >
                        Flow <sub>(Coming Soon)</sub>
                      </div>
                    </div>
                    {activeTab === "Ethereum" ? (
                      <div className="walletsDiv">
                        <p className="headingWallet">Recent</p>
                        <div
                          className="Wallet"
                          // onClick={() => {
                          //   // connectWalletFn();

                          // }}
                          onClick={() => {
                            if (!window?.ethereum?.isMetaMask) {
                              window.open("https://metamask.io/", "_blank");
                            } else {
                              // setConnectWalletState(!connectWalletState);
                              connectMetaMaskFunc();
                            }
                            // checkWalletIsConnected();
                          }}
                        >
                          <div className="logo">
                            <img
                              src={metamask}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              MetaMask
                            </h5>
                          </div>
                        </div>
                        <p className="headingWallet">Popular</p>
                        <div
                          className="Wallet"
                          onClick={() => {
                            walletConnectFunc();
                          }}
                        >
                          <div className="logo">
                            <img
                              src={walletConnectPng}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              WalletConnect
                            </h5>
                          </div>
                        </div>
                        <div
                          className="Wallet"
                          onClick={() => {
                            coinBaseWalletFunc();
                          }}
                        >
                          <div className="logo">
                            <img
                              src={coinBaseWallet}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              CoinBase Wallet
                            </h5>
                          </div>
                        </div>
                        {/* <div className="Wallet showMore" onClick={() => {}}>
                          Show More
                        </div> */}
                      </div>
                    ) : activeTab === "Tezos" ? (
                      <div className="walletsDiv">
                        <p className="headingWallet">Popular</p>
                        <div className="Wallet" onClick={() => {}}>
                          <div className="logo">
                            <img
                              src={phantomWallet}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              Phantom
                            </h5>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === "Flow" ? (
                      <div className="walletsDiv">
                        <p className="headingWallet">Popular</p>
                        <div className="Wallet" onClick={() => {}}>
                          <div className="logo">
                            <img
                              src={bloctoWallet}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              Blocto
                            </h5>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === "Polygon" ? (
                      <div className="walletsDiv">
                        <p className="headingWallet">Popular</p>
                        <div className="Wallet" onClick={() => {}}>
                          <div className="logo">
                            <img
                              src={metamask}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              MetaMask
                            </h5>
                          </div>
                        </div>
                        <div className="Wallet" onClick={() => {}}>
                          <div className="logo">
                            <img
                              src={walletConnect}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              WalletConnect
                            </h5>
                          </div>
                        </div>
                        <div className="Wallet" onClick={() => {}}>
                          <div className="logo">
                            <img
                              src={coinBaseWallet}
                              className={
                                props.connectedWallet ? "walletLoader" : ""
                              }
                            />
                          </div>
                          <div className="walletName">
                            <h5 className="sub-title connectTextWallet style-1 mg-bt-12">
                              CoinBase Wallet
                            </h5>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  walletLoader: state.wallet.walletLoader,
  connectedWallet: state.wallet.connectedWallet,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      connectWallet,
      wallet_connect,
      coinbaseWallet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);

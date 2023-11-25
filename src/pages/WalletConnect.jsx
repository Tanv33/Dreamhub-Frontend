import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logodark from "../assets/images/logo/logodream.svg";
import { Grid } from "@mui/material";

import img1 from "../assets/images/icon/connect-1.png";
import img2 from "../assets/images/icon/connect-2.png";
import img3 from "../assets/images/icon/connect-3.png";
import img4 from "../assets/images/icon/connect-4.png";
import img5 from "../assets/images/icon/connect-5.png";
import img6 from "../assets/images/icon/connect-6.png";
/*import img7 from '../assets/images/icon/connect-7.png'
import img8 from '../assets/images/icon/connect-8.png'*/
import { connectWallet } from "../module/action/wallet";
import { useWeb3Context } from "web3-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const WalletConnect = (props) => {
  const { networkId } = useWeb3Context();
  let navigate = useNavigate();
  const connectWalletFn = () => {
    // props.connectWallet(networkId, navigate, alert, 'Your Wallet Has Been Connected.');
  };
  return (
    <div>
      <div className="tf-connect-wallet">
        <div className="tayson" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="containersu">
              <div className="back">
                <Link to="/" rel="home" className="main-logo">
                  <img id="logo_header" src={logodark} alt="nft-gaming" />
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 className="tf-title-heading ct style-2 mg-bt-12">Sign In</h2>
            <h5 className="sub-title ct style-1">
              Choose one of available wallet providers or create a new wallet.
              <a href="https://www.coinbase.com/es/learn/crypto-basics/what-is-a-crypto-wallet">
                <span> What is a Wallet?</span>
              </a>
            </h5>
            <div className="buttons-c">
              <div
                className="sc-btn-top2 mg-r-12"
                id="site-header"
                onClick={() => {
                  connectWalletFn();
                }}
              >
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img1} alt="" />
                  <span>Meta Mask</span>
                </Link>
              </div>
              <div className="sc-btn-top2 mg-r-12" id="site-header">
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img2} alt="" />
                  <span>Bitski</span>
                </Link>
              </div>
              <div className="sc-btn-top2 mg-r-12" id="site-header">
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img3} alt="" />
                  <span>Fortmatic</span>
                </Link>
              </div>
              <div className="sc-btn-top2 mg-r-12" id="site-header">
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img4} alt="" />
                  <span>Wallet Connect</span>
                </Link>
              </div>
              <div className="sc-btn-top2 mg-r-12" id="site-header">
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img5} alt="" />
                  <span>Coinbase Wallet</span>
                </Link>
              </div>

              <div className="sc-btn-top2 mg-r-12" id="site-header">
                <Link to="/wallet-connect" className="sc-button style-1 pri-1">
                  <img src={img6} alt="" />
                  <span>Authereum</span>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WalletConnect);

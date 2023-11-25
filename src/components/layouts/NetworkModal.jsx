import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { buyNFT } from "../../module/action/user-task";
import { bindActionCreators } from "redux";
import { changeNetwork } from "../../module/action/wallet";
import { CHAIN_ID } from "../../constants";
import Web3 from "web3";
import { getCurrentProvider, web3WithProvider } from "./../../web3-provider";

const NetworkModal = (props) => {
  useEffect(() => {
    console.log("asdsdasdsa");
  }, [props.show]);
  const changeNetworkFn = async () => {
    const web3Provider = web3WithProvider();
    const web3 = new Web3(web3Provider);
    let currentProvider = getCurrentProvider();
    console.log(currentProvider.networkVersion, CHAIN_ID);
    if (currentProvider.networkVersion !== CHAIN_ID) {
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
              // {
              //   chainName: "Fantom testnet",
              //   chainId: web3.utils.toHex(CHAIN_ID),
              //   nativeCurrency: { name: "FTM", decimals: 18, symbol: "FTM" },
              //   rpcUrls: ["https://rpc.testnet.fantom.network/"],
              // },
              // {
              //   chainName: "Rinkeby Test Network",
              //   chainId: web3.utils.toHex(CHAIN_ID),
              //   nativeCurrency: {
              //     name: "RinkebyETH",
              //     decimals: 18,
              //     symbol: "RinkebyETH",
              //   },
              //   rpcUrls: ["https://rinkeby.infura.io/v3/"],
              // },
              {
                chainName: "Goerli test network",
                chainId: web3.utils.toHex(CHAIN_ID),
                nativeCurrency: {
                  name: "GoerliETH",
                  decimals: 18,
                  symbol: "LINK",
                },
                rpcUrls: ["https://goerli.infura.io/v3/"],
              },
            ],
          });
        }
      }
    } else {
      return true;
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Change Your Network</h3>
        <div className="hr"></div>
        <p>We are using Fantom Testnet Network for now</p>
        <span
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            // console.log(true);
            // props.buyNFT(nft, navigate);
            changeNetworkFn();
          }}
          style={{ cursor: "pointer" }}
        >
          Change Network
        </span>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NetworkModal);

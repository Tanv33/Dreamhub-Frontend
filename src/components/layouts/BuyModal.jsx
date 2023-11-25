import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { buyNFT } from "../../module/action/user-task";
import { bindActionCreators } from "redux";
import { useAlert } from "react-alert";
import Spinner from "../../pages/spinner";
import { CHAIN_ID } from "../../constants";
import NetworkModal from "./NetworkModal";
import { getCurrentProvider } from "./../../web3-provider";

const BuyModal = (props) => {
  let navigate = useNavigate();
  let alert = useAlert();
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const [nft, setNft] = useState(false);
  const [provider, setProvider] = useState(false);
  // const [nftPrice, setNftPrice] = useState(0);
  useEffect(() => {
    if (singleNft) {
      setNft(singleNft);
      // setNftPrice(
      //   Number(singleNft?.actualPrice) +
      //     Number(singleNft?.actualPrice) * 2.5 * 0.01
      // );
    } else if (props.itemNFT) {
      setNft(props.itemNFT);
    }
  }, [singleNft, props.itemNFT]);

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const hideNetworkModal = () => {
    setShowNetworkModal(false);
  };

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const currentProvider = getCurrentProvider();
    setProvider(currentProvider);
    const chainChange = (chainId) => {
      // dispatch(getWalletBalance(accountNumber))
      console.log(chainId);
      if (chainId === "0xfa2" || chainId === "4002") {
        setShowNetworkModal(false);
      }
    };

    currentProvider?.on("chainChanged", chainChange);

    return () => {
      // if(currentProvider){
      // currentProvider?.off("chainChanged", chainChange);
      // }
    };
  }, []);

  return (
    <>
      <NetworkModal show={showNetworkModal} onHide={hideNetworkModal} />
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body space-y-20 pd-40">
          <h3>Buy NFT Card</h3>
          <h3 className="text-center">
            NFT Price is {/* <span className="price color-popup"> */}
            {/* {nft?.actualPrice} ETH */}
            {nft?.actualPrice
              ? nft?.actualPrice
              : nft?.events?.AskNew?.returnValues?.askPrice}{" "}
            ETH
            {/* </span> */}
          </h3>
          {/* <input type="text" className="form-control" placeholder="00.00 ETH" />
        <p>
          Enter quantity. <span className="color-popup">5 available</span>
        </p> */}
          {/* <input type="number" className="form-control" placeholder="1" /> */}
          <div className="hr"></div>
          <div className="d-flex justify-content-between">
            <p> NFT Price:</p>
            <p className="text-right price color-popup">
              {" "}
              {nft?.actualPrice
                ? nft?.actualPrice
                : nft?.events?.AskNew?.returnValues?.askPrice}{" "}
              ETH
            </p>
          </div>
          {/* <div className="d-flex justify-content-between">
          <p> Service free:</p>
          <p className="text-right price color-popup">2.5%</p>
        </div>
        <div className="d-flex justify-content-between">
          <p> Total NFT amount:</p>
          <p className="text-right price color-popup">
            {" "}
            {Number(nft?.actualPrice) +
              Number(nft?.actualPrice) * 2.5 * 0.01}{" "}
            ETH
          </p>
        </div> */}
          <button
            //   to="/wallet-connect"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#popup_bid_success"
            data-dismiss="modal"
            aria-label="Close"
            onClick={async () => {
              if (user?._id) {
                if (provider?.networkVersion !== CHAIN_ID) {
                  setShowNetworkModal(true);
                } else {
                  props.buyNFT(
                    nft,
                    navigate,
                    alert,
                    "You have successfully bought this NFT",
                    props.onHide
                  )
                }
              } else {
                navigate(`/wallet-connect/${props.itemNFT._id}`);
              }


              // if (provider?.networkVersion !== CHAIN_ID) {
              //   setShowNetworkModal(true);
              // } else {
              //   console.log(nft);
              //   user?._id
              //     ? props.buyNFT(
              //       nft,
              //       navigate,
              //       alert,
              //       "You have successfully bought this NFT",
              //       props.onHide
              //     )
              //     : navigate(`/wallet-connect/${props.itemNFT._id}`);
              // }
            }}
            style={{ cursor: "pointer" }}
            disabled={props.buyNftLoader}
          >
            {props.buyNftLoader ? <Spinner /> : `Buy NFT`}
          </button>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  buyNftLoader: state.wallet.buyNftLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      buyNFT,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal);

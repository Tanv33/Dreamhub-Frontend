import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { sellNft } from "../../module/action/user-task";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "../../pages/spinner";
import { useAlert } from "react-alert";
import NetworkModal from "./NetworkModal";
import { CHAIN_ID } from "../../constants";
import { getCurrentProvider } from "../../web3-provider";

const SellModal = (props) => {
  let navigate = useNavigate();
  let alert = useAlert();
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const [dataObject, setDataObject] = useState({
    price: "0",
    nftType: "sell",
    // quantity: "",
  });
  const [sellPrice, setSellPrice] = useState(0.25);

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const hideNetworkModal = () => {
    setShowNetworkModal(false);
  };

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const chainChange = (chainId) => {
      // dispatch(getWalletBalance(accountNumber))
      console.log(chainId);
      if (chainId === "0xfa2" || chainId === "4002") {
        setShowNetworkModal(false);
      }
    };

    getCurrentProvider()?.on("chainChanged", chainChange);

    return () => {
      // if(getCurrentProvider()?){
      // getCurrentProvider()?.off("chainChanged", chainChange);
      // }
    };
  }, []);

  const submitFunc = (e) => {
    e.preventDefault();
    // console.log(getCurrentProvider()?.networkVersion, CHAIN_ID);
    if (getCurrentProvider()?.networkVersion !== CHAIN_ID) {
      setShowNetworkModal(true);
    } else {
      props.sellNft(
        user,
        singleNft,
        dataObject,
        sellPrice + Number(dataObject?.price),
        false,
        alert,
        "Your NFT has been placed on sale.",
        props.onHide
      );
    }
    // console.log(dataObject,sellPrice)
  };

  useEffect(() => {
    console.log(props.sellNftLoader, "props.sellNftLoader");
  }, [props.sellNftLoader]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton></Modal.Header>

        <form onSubmit={submitFunc}>
          <div className="modal-body space-y-20 pd-40">
            <h3></h3>
            <p className="text-center">
              You must Sell at least{" "}
              <span className="price color-popup">4.89 ETH</span>
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, price: e.target.value };
                });
                setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            />
            {/* <p>
          Enter quantity. <span className="color-popup">5 available</span>
        </p>
        <input
          type="number"
          className="form-control"
          placeholder="1"
          onChange={(e) => {
            setDataObject((preData) => {
              return { ...preData, quantity: e.target.value };
            });
          }}
        /> */}
            <div className="hr"></div>
            {/* <div className="d-flex justify-content-between">
          <p> You must Sell at least:</p>
          <p className="text-right price color-popup"> 4.89 ETH </p>
        </div> */}
            <div className="d-flex justify-content-between">
              <p> Service free:</p>
              <p className="text-right price color-popup"> 2.5% </p>
            </div>
            <div className="d-flex justify-content-between">
              <p> Total Sell amount:</p>
              <p className="text-right price color-popup">
                {sellPrice + Number(dataObject?.price)}
              </p>
            </div>
            <button
              //   to="/wallet-connect"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#popup_bid_success"
              data-dismiss="modal"
              aria-label="Close"
              type="submit"
              // onClick={() => {}}
              disabled={props.sellNftLoader}
            >
              {props.sellNftLoader ? <Spinner /> : `Sell `}
            </button>
          </div>
        </form>
      </Modal>
      <NetworkModal show={showNetworkModal} onHide={hideNetworkModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  sellNftLoader: state.wallet.sellNftLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sellNft,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SellModal);

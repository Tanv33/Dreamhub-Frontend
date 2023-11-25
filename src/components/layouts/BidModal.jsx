import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { bidNft } from "../../module/action/user-task";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "../../pages/spinner";
import { useAlert } from "react-alert";
import NetworkModal from "./NetworkModal";
import { CHAIN_ID } from "../../constants";
import { getCurrentProvider } from "../../web3-provider";

const BidModal = (props) => {
  let navigate = useNavigate();
  let alert = useAlert();
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const [dataObject, setDataObject] = useState({
    price: "0.001",
    minimumBid: "0.002",
    startDate: "2022-11-24",
    endDate: "2022-11-23",
    bidGap: "0.002",
    nftType: "bid",
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
    console.log(getCurrentProvider()?.networkVersion, CHAIN_ID);
    if (getCurrentProvider()?.networkVersion !== CHAIN_ID) {
      setShowNetworkModal(true);
    } else {
      props.bidNft(
        user,
        singleNft,
        dataObject,
        sellPrice + Number(dataObject?.price),
        false,
        alert,
        "Your NFT has been placed on bid.",
        props.onHide
      );
    }
    // console.log(dataObject);
  };

  useEffect(() => {
    console.log(props.bidNftLoader, "props.bidNftLoader");
  }, [props.bidNftLoader]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton></Modal.Header>

        <form onSubmit={submitFunc}>
          {/* <div className="modal-body space-y-20 pd-40"> */}
          <div className="modal-body space-y-15 pd-40">
            <h3></h3>
            <p className="text-center">
              {/* You must Sell at least{" "} */}
              <span className="price color-popup">Fill up the form</span>
            </p>
            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Enter Price
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              value={dataObject.price}
              step=".000000001"
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, price: e.target.value };
                });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            />
            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Minimum Bid
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              value={dataObject.minimumBid}
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, minimumBid: e.target.value };
                });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            />
            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Start Date & End Date
            </p>
            <input
              type="datetime-local"
              className="form-control"
              placeholder="00.00 ETH"
              value={dataObject.startDate}
              // step=".000000001"
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, startDate: e.target.value };
                });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            />
            <input
              type="datetime-local"
              className="form-control"
              placeholder="00.00 ETH"
              value={dataObject.endDate}
              // step=".000000001"
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, endDate: e.target.value };
                });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            />
            {/* <p>
              End Date
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              required
              onChange={(e) => {
                // setDataObject((preData) => {
                //   return { ...preData, price: e.target.value };
                // });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
              }}
            /> */}
            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Bid Gap
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              value={dataObject.bidGap}
              step=".000000001"
              required
              onChange={(e) => {
                setDataObject((preData) => {
                  return { ...preData, bidGap: e.target.value };
                });
                // setSellPrice(Number(dataObject.price) * 2.5 * 0.01);
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
            {/* <div className="d-flex justify-content-between">
              <p> Service free:</p>
              <p className="text-right price color-popup"> 2.5% </p>
            </div>
            <div className="d-flex justify-content-between">
              <p> Total Sell amount:</p>
              <p className="text-right price color-popup">
                {sellPrice + Number(dataObject?.price)}
              </p>
            </div> */}
            <button
              //   to="/wallet-connect"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#popup_bid_success"
              data-dismiss="modal"
              aria-label="Close"
              type="submit"
              disabled={props.bidNftLoader}
            >
              {props.bidNftLoader ? <Spinner /> : `Bid `}
            </button>
          </div>
        </form>
      </Modal>
      <NetworkModal show={showNetworkModal} onHide={hideNetworkModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  bidNftLoader: state.wallet.bidNftLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      bidNft,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BidModal);

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { auctionNft, placeAuction, updatePlaceAuction } from "../../module/action/user-task";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "../../pages/spinner";
import { useAlert } from "react-alert";
import NetworkModal from "./NetworkModal";
import { CHAIN_ID } from "../../constants";
import { getCurrentProvider } from "../../web3-provider";

const AuctionOfferModal = (props) => {
  let navigate = useNavigate();
  let alert = useAlert();
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const [dataObject, setDataObject] = useState({
    "nft_id": "",
    "auctioner_id": "",
    "auctioner_wallet_address": "",
    "auction_price": ""
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

  const [highestBidOffer, setHighestBidOffer] = useState("")

  useEffect(() => {
    console.log(props.allAuctionOffers, 'props.allAuctionOffers')
    if (props.allAuctionOffers && props.allAuctionOffers.length) {
      setHighestBidOffer(props.allAuctionOffers[props.allAuctionOffers.length - 1].auction_price)
    } else {
      setHighestBidOffer('No Bid Yet')
    }
  }, [props.allAuctionOffers])

  const submitFunc = (e) => {
    e.preventDefault();
    console.log(dataObject);
    if (props.editObjAuctionObj) {
      let obj = {
        "auction_id": props.editObjAuctionObj.auction_id,
        "auctioner_id": user._id,
        "auction_price": dataObject.auction_price
      }

      props.updatePlaceAuction(obj, alert, props.onHide, clearState, dataObject.nft_id)
    } else {
      props.placeAuction(dataObject, alert, props.onHide, clearState)
    }
  };

  useEffect(() => {
    console.log(props.auctionNftLoader, "props.auctionNftLoader");
  }, [props.auctionNftLoader]);

  useEffect(() => {
    if (singleNft &&
      user) {
      let data = { ...dataObject }
      data.auctioner_id = user._id
      data.auctioner_wallet_address = user.username
      data.nft_id = singleNft._id
      setDataObject(data)
    }
  }, [singleNft,
    user])

  useEffect(() => {
    if (props.editObjAuctionObj) {
      setDataObject({
        ...props.editObjAuctionObj
      })
    } else {
      setDataObject({
        "auctioner_id": user._id,
        "auctioner_wallet_address": user.username,
        "nft_id": singleNft._id,
        "auction_price": ""
      })
    }
  }, [props.editObjAuctionObj])

  const clearState = () => {
    setDataObject({
      "nft_id": singleNft._id,
      "auctioner_id": user._id,
      "auctioner_wallet_address": user.username,
      "auction_price": "",
    });
    props.setEditAuctionObj(false)
  }

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
            {/* <p> */}
            {/* Enter Price. <span className="color-popup">5 available</span> */}
            {/* Enter Price
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
            /> */}
            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Minimum Bid
            </p>
            <input
              type="text"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              value={singleNft.minimumBid + " ETH"}
              required
              disabled
            />

            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Current Bid Offer
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              value={highestBidOffer}
              required
              disabled
            />

            <p>
              {/* Enter Price. <span className="color-popup">5 available</span> */}
              Your Bid Offer
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              value={dataObject.auction_price}
              required
              onChange={(ev) => {
                let data = { ...dataObject }
                data.auction_price = ev.target.value
                setDataObject(data)
              }}
            />

            <p>
              Bid Gap
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              value={singleNft.bidGap}
              step=".000000001"
              required
              disabled
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
              disabled={props.auctionNftLoader}
            >
              {false ? <Spinner /> : `Bid `}
            </button>
          </div>
        </form>
      </Modal>
      <NetworkModal show={showNetworkModal} onHide={hideNetworkModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  allAuctionOffers: state.wallet.allAuctionOffers
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      placeAuction,
      updatePlaceAuction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuctionOfferModal);

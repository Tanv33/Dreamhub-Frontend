import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "../../pages/spinner";
import { useAlert } from "react-alert";
import NetworkModal from "./NetworkModal";
import { CHAIN_ID } from "../../constants";
import { getCurrentProvider } from "../../web3-provider";
import { placeBid, updatePlaceBid } from "../../module/action/user-task";

const BidOfferModal = (props) => {
  let navigate = useNavigate();
  let alert = useAlert();
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const [dataObject, setDataObject] = useState({
    "nft_id": "",
    "bidder_id": "",
    "bidder_wallet_address": "",
    "bid_price": ""
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
    if (props.editObjBidObj) {
      let obj = {
        "bid_id": props.editObjBidObj.bid_id,
        "bidder_id": user._id,
        "bid_price": dataObject.bid_price
      }

      props.updatePlaceBid(obj, alert, props.onHide, clearState, dataObject.nft_id)
    } else {
      props.placeBid(dataObject, alert, props.onHide, clearState)
    }
    // console.log(dataObject, 'dataObject')
  };

  const [highestBidOffer, setHighestBidOffer] = useState("")

  useEffect(() => {
    console.log(props.allBidOffers, 'props.allBidOffers')
    if (props.allBidOffers && props.allBidOffers.length) {
      setHighestBidOffer(props.allBidOffers[props.allBidOffers.length - 1].bid_price)
    } else {
      setHighestBidOffer('No Bid Yet')
    }
  }, [props.allBidOffers])

  useEffect(() => {
    if (singleNft &&
      user) {
      let data = { ...dataObject }
      data.bidder_id = user._id
      data.bidder_wallet_address = user.username
      data.nft_id = singleNft._id
      setDataObject(data)
    }
  }, [singleNft,
    user])


  useEffect(() => {
    if (props.editObjBidObj) {
      setDataObject({
        ...props.editObjBidObj
      })
    } else {
      setDataObject({
        "bidder_id": user._id,
        "bidder_wallet_address": user.username,
        "nft_id": singleNft._id,
        "bid_price": ""
      })
    }
  }, [props.editObjBidObj])

  const clearState = () => {
    setDataObject({
      "bidder_id": user._id,
      "bidder_wallet_address": user.username,
      "nft_id": singleNft._id,
      "bid_price": ""
    });
    props.setEditBidObj(false)
  }



  return (
    <>
      <Modal show={props.show} onHide={() => {
        props.onHide(); clearState()
      }}>
        <Modal.Header closeButton></Modal.Header>

        <form onSubmit={submitFunc}>
          <div className="modal-body space-y-15 pd-40">
            <h3></h3>
            <p className="text-center">
              <span className="price color-popup">Fill up the form</span>
            </p>
            <p>
              Price
            </p>
            <input
              type="text"
              className="form-control"
              required
              value={props.nft?.actualPrice + ' ETH'}
              disabled
            />
            <p>
              Current Highest Bid
            </p>
            <input
              type="text"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              required
              value={highestBidOffer}
              disabled
            />
            <p>
              Your Bid Offer
            </p>
            <input
              type="number"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              value={dataObject.bid_price}
              required
              onChange={(ev) => {
                let data = { ...dataObject }
                data.bid_price = ev.target.value
                setDataObject(data)
              }}
            />
            <p>
              Bid Gap
            </p>
            <input
              type="text"
              className="form-control"
              placeholder="00.00 ETH"
              step=".000000001"
              required
              value={props.nft?.bidGap}
              disabled
            />
            <div className="hr"></div>
            <div className="bidBuyButton">
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
                {props.placeBidLoader ? <Spinner /> : `Bid `}
              </button>
              {!props.editObjBidObj ?
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
                  {false ? <Spinner /> :
                    <>
                      Buy<sub>(On Original Price)</sub>
                    </>
                  }
                </button>
                : null}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  allBidOffers: state.wallet.allBidOffers,
  placeBidLoader: state.wallet.placeBidLoader

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      placeBid,
      updatePlaceBid
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BidOfferModal);

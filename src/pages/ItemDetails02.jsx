import React, { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/LiveAuction";
import img3 from "../assets/images/avatar/avt-1.jpg";
import dreamHubSVG from "../assets/images/ICON_MENU_NEW.svg";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import {
  acceptAuctionOffers,
  acceptBidOffers,
  auctionOffers,
  bidOffers,
  cancelAuctionOffers,
  cancelBidOffers,
  getSingleNft,
} from "../module/action/user-task";
import SellModal from "../components/layouts/SellModal";
import BuyModal from "../components/layouts/BuyModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import HeaderNew from "../components/header/HeaderNew";
import Spinner from "./spinner";
import BidModal from "../components/layouts/BidModal";
import Countdown from "react-countdown";
import AuctionModal from "../components/layouts/AuctionModal";
import BidOfferModal from "../components/layouts/BidOfferModal";
import avt from "../assets/profileIcon.webp";
import { Dropdown } from "react-bootstrap";
import { useAlert } from "react-alert";
import AuctionOfferModal from "../components/layouts/AuctionOfferModal";

const ItemDetails02 = (props) => {
  const singleNft = useSelector((e) => e.wallet.singleNft);
  const user = useSelector((e) => e.wallet.user);
  const singleNftLoader = useSelector((e) => e.wallet.singleNftLoader);
  const [nft, setNft] = useState(false);
  const [sellModalShow, setSellModalShow] = useState(false);
  const [bidModalShow, setBidModalShow] = useState(false);
  const [bidOfferModalShow, setBidOfferModalShow] = useState(false);
  const [auctionModalShow, setAuctionModalShow] = useState(false);
  const [auctionOfferModalShow, setAuctionOfferModalShow] = useState(false);
  const [buyModalShow, setBuyModalShow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let navigate = useNavigate();
  const alert = useAlert();
  var nftId = window.location.pathname.split("details-02/")[1];
  useEffect(() => {
    if (nftId) {
      props.getSingleNft(nftId);
    } else {
      console.log("can't target pathname without split -> details-02/ ");
    }
  }, []);
  useEffect(() => {
    if (singleNft) {
      setNft(singleNft);
      console.log(singleNft);
      if (singleNft.nftType === "bid") {
        props.bidOffers(singleNft._id);
      } else if (singleNft.nftType === "auction") {
        props.auctionOffers(singleNft._id);
      }
    }
  }, [singleNft]);

  const [dataHistory] = useState([
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "TBA",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "at 06/10/2021, 3:20 AM",
      price: "TBA",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "TBA",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "TBA",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "TBA",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "TBA",
      priceChange: "$12.246",
    },
  ]);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("is-fixed")
      : header.classList.remove("is-fixed");
    scrollTop >= 400
      ? header.classList.add("is-small")
      : header.classList.remove("is-small");

    // console.log(scrollTop)
  };

  const [days, setDays] = useState("0");
  const [hours, setHours] = useState("0");
  const [mint, setMint] = useState("0");
  const [seconds, setSeconds] = useState("0");
  function convertTZ(date, tzString) {
    // return new Date( bnew=)
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }
  useEffect(() => {
    if (nft) {
      const isoStr1 = nft?.endDate;
      let date2;
      if (isoStr1) {
        date2 = new Date(isoStr1.slice(0, -1));
      }

      const isoStr1S = nft?.startDate;
      let date2S;
      if (isoStr1S) {
        date2S = new Date(isoStr1S.slice(0, -1));
      }

      setStartDate(
        new Date(date2S).toLocaleDateString() +
          " " +
          new Date(date2S).toLocaleTimeString()
      );
      setEndDate(
        new Date(date2).toLocaleDateString() +
          " " +
          new Date(date2).toLocaleTimeString()
      );

      let targetDate = date2;
      let refreshDelayMs = 1000;

      console.log(date2S, date2);

      function updateCounter() {
        let distance = (targetDate - new Date()) / 1000;
        let seconds = Math.floor(distance % 60)
          .toString()
          .padStart(2, "0");
        distance = distance / 60;
        let minutes = Math.floor(distance % 60)
          .toString()
          .padStart(2, "0");
        distance = distance / 60;
        let hours = Math.floor(distance % 24)
          .toString()
          .padStart(2, "0");
        let days = Math.floor(distance / 24)
          .toString()
          .padStart(2, "0");
        // console.log(days, hours, minutes, seconds)
        setDays(days);
        setHours(hours);
        setMint(minutes);
        setSeconds(seconds);
        // if (Number(days) === 0 &&
        //     Number(hours) === 0 &&
        //     Number(minutes) === 0 &&
        //     Number(seconds) === 0
        // ) {
        //     console.log('LAUNCH')
        //     console.log('LAUNCH')
        //     // props.publicFn()
        // }

        // ${days} days ${hours}:${minutes}:${seconds};
        if (
          Number(days) <= 0 &&
          Number(hours) <= 0 &&
          Number(minutes) <= 0 &&
          Number(seconds) <= 0
        ) {
          // console.log('LAUNCH')
          // props.publicFn()
          // console.log('LAUNCH')
          setDays(0);
          setHours(0);
          setMint(0);
          setSeconds(0);
        } else {
          // console.log('dasdsad')
          setTimeout(updateCounter, refreshDelayMs);
        }
      }

      updateCounter();
    }
  }, [nft]);
  const [loaderCancel, setLoaderCancel] = useState("");

  const cancelBidOffer = (offer, i) => {
    setLoaderCancel(i);
    let obj = {
      bid_id: offer._id,
      bidder_id: offer.bidder_id,
    };
    props.cancelBidOffers(obj, alert, offer.nft_id, setLoaderCancel);
  };

  const cancelAuctionOffer = (offer, i) => {
    setLoaderCancel(i);
    let obj = {
      auction_id: offer._id,
      auctioner_id: offer.auctioner_id,
    };
    props.cancelAuctionOffers(obj, alert, offer.nft_id, setLoaderCancel);
  };

  const [editObjBidObj, setEditBidObj] = useState(false);
  const [editObjAuctionObj, setEditAuctionObj] = useState(false);

  const acceptBid = (offer) => {
    let obj = {
      bid_id: offer._id,
      bidder_id: offer.bidder_id,
    };
    props.acceptBidOffers(obj, alert, offer.nft_id);
  };

  const acceptAuction = (offer) => {
    let obj = {
      auction_id: offer._id,
      auctioner_id: offer.bidder_id,
    };
    props.acceptAuctionOffers(obj, alert, offer.nft_id);
  };

  return (
    <div className="item-details">
      {/* <ParticleComponent /> */}

      <HeaderNew search={true} setSearch={false} />

      <section className="flat-title-page">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Item Details</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {singleNftLoader ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="tf-section tf-item-details style-2">
          <div className="tayson" />
          <div className="themesflat-container">
            <div className="row">
              <div className="col-xl-6 col-md-12">
                <div className="content-left">
                  <div className="media">
                    {nft?.nftImg ? (
                      <img src={`${nft?.nftImg}`} alt="Axies" />
                    ) : (
                      <img
                        src={dreamHubSVG}
                        alt="Axies"
                        style={{
                          background: "#0000004f",
                          backdropFilter: "blur(5px)",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12">
                <div className="content-right">
                  <div className="sc-item-details">
                    <div className="meta-item">
                      <div className="left">
                        <h2>{nft?.title}</h2>
                      </div>
                      <div className="right">
                        <span className="viewed eye mg-r-8">0</span>
                        <span
                          to="/login"
                          className="liked heart wishlist-button"
                        >
                          <span className="number-like">0</span>
                        </span>
                      </div>
                    </div>
                    <div className="client-infor sc-card-product">
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            {nft?.ownerObject ? (
                              <img
                                src={`${nft?.ownerObject[0]?.profile_img}`}
                                alt="Axies"
                              />
                            ) : (
                              <img
                                src={dreamHubSVG}
                                alt="Axies"
                                style={{
                                  background: "#0000004f",
                                  backdropFilter: "blur(5px)",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="info"
                            // onClick={()=>console.log(nft)}
                          >
                            <span>Owned By</span>
                            <h6>
                              {" "}
                              {nft?.ownerObject
                                ? nft?.ownerObject[0]?.full_Name
                                : ""}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            {nft?.creatorObject ? (
                              <img
                                src={`${nft?.creatorObject[0]?.profile_img}`}
                                alt="Axies"
                              />
                            ) : (
                              <img
                                src={dreamHubSVG}
                                alt="Axies"
                                style={{
                                  background: "#0000004f",
                                  backdropFilter: "blur(5px)",
                                }}
                              />
                            )}
                          </div>
                          <div className="info">
                            <span>Create By</span>
                            <h6>
                              <Link
                                to={`/authors-02/auther?id=${nft?.created_by}`}
                              >
                                {nft?.creatorObject
                                  ? nft?.creatorObject[0]?.full_Name
                                  : ""}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      {nft?.description}
                      {/* Habitant sollicitudin faucibus cursus lectus pulvinar dolor
                  non ultrices eget. Facilisi lobortisal morbi fringilla urna
                  amet sed ipsum vitae ipsum malesuada. Habitant sollicitudin
                  faucibus cursus lectus pulvinar dolor non ultrices eget.
                  Facilisi lobortisal morbi fringilla urna amet sed ipsum */}
                    </p>
                    <div className="meta-item-details">
                      <div className="item-style-2 item-details">
                        <ul className="list-details">
                          <li>
                            <span>Artist : </span>
                            <h6>
                              {nft?.creatorObject
                                ? nft?.creatorObject[0]?.full_Name
                                : ""}
                            </h6>
                          </li>
                          {/* <li>
                        <span>Size : </span>
                        <h6>3000 x 3000</h6>{" "}
                      </li> */}
                          <li>
                            <span>Create : </span>
                            <h6>{nft?.createdAt?.split("T")[0]}</h6>{" "}
                          </li>
                          <li>
                            <span>NFT Type : </span>
                            <h6>{nft?.nftType}</h6>
                          </li>
                          {/* <li>
                        <span>Collection : </span>
                        <h6>Cyberpunk City Art</h6>{" "}
                      </li> */}
                        </ul>
                      </div>
                      <div className="item-style-2">
                        <div className="item meta-price">
                          <span className="heading">Current Price</span>
                          <div className="price">
                            <div className="price-box">
                              {nft?.actualPrice ? (
                                <h5>{nft?.actualPrice} TBA</h5>
                              ) : (
                                <h5>
                                  {
                                    nft?.events?._listOnSale?.returnValues
                                      ?.price
                                  }{" "}
                                  TBA
                                </h5>
                              )}
                              {/* <h5>{nft?.actualPrice} ETH</h5> */}
                              {/* <span>= $12.246</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="item meta-price">
                          {/* <span className="heading">Transaction</span> */}
                          <div className="price">
                            <div className="price-box">
                              {nft?.transactionHash && (
                                <Link
                                  target="_blank"
                                  to={`https://goerli.etherscan.io/tx/${nft?.transactionHash}`}
                                >
                                  <h5>Contract Address...</h5>
                                </Link>
                              )}
                              {/* <h5>{nft?.actualPrice} ETH</h5> */}
                              {/* <span>= $12.246</span> */}
                            </div>
                          </div>
                        </div>
                        {/* <div className="item count-down">
                      <Countdown date={Date.now() + 500000000}>
                        <span>You are good to go!</span>
                      </Countdown>
                    </div> */}
                      </div>
                    </div>
                    {nft.nftType === "bid" ? (
                      <div className="meta-item-details">
                        <div className="item-style-2 item-details">
                          <ul className="list-details">
                            <li>
                              <span>Start Date : </span>
                              <h6>{startDate} </h6>
                            </li>
                            {/* <li>
                        <span>Size : </span>
                        <h6>3000 x 3000</h6>{" "}
                      </li> */}
                            <li>
                              <span>End Date : </span>
                              <h6>{endDate} </h6>{" "}
                            </li>
                            {/* <li>
                        <span>Collection : </span>
                        <h6>Cyberpunk City Art</h6>{" "}
                      </li> */}
                          </ul>
                        </div>
                        <div className="item-style-2">
                          <div className="item meta-price">
                            <span className="heading">Bid Timer</span>
                            <div className="price">
                              <div className="price-box timeBoxDiv">
                                {+days ? (
                                  <>
                                    <h5 className="timerBox">
                                      {days}&nbsp;<strong>:</strong>&nbsp;
                                    </h5>
                                    {/* <h5 className="colunTime">:</h5> */}
                                  </>
                                ) : null}

                                <h5 className="timerBox">
                                  {hours}&nbsp;<strong>:</strong>&nbsp;
                                </h5>
                                {/* <h5 className="colunTime">:</h5> */}

                                <h5 className="timerBox">
                                  {mint}&nbsp;<strong>:</strong>&nbsp;
                                </h5>
                                {/* <h5 className="colunTime">:</h5> */}

                                <h5 className="timerBox">{seconds}</h5>

                                {/* {<h5>{}</h5>} */}
                                {/* <h5>{nft?.actualPrice} ETH</h5> */}
                                {/* <span>= $12.246</span> */}
                              </div>
                            </div>
                          </div>
                          {/* <div className="item count-down">
                      <Countdown date={Date.now() + 500000000}>
                        <span>You are good to go!</span>
                      </Countdown>
                    </div> */}
                        </div>
                      </div>
                    ) : null}
                    {nft?.nftType === "mint" ? (
                      nft?.owner === user?._id ? (
                        <>
                          <span
                            style={{ cursor: "pointer" }}
                            //   to="/wallet-connect"
                            className="sc-button loadmore style bag fl-button pri-3"
                            onClick={async () => {
                              setSellModalShow(true);
                            }}
                          >
                            <span>Sell NFT</span>
                          </span>
                          {/* <span
                            style={{ cursor: "pointer" }}
                            //   to="/wallet-connect"
                            className="sc-button loadmore style bag fl-button pri-3"
                            onClick={async () => {
                              setBidModalShow(true);
                              // console.log("nft");
                            }}
                          >
                            <span>Bid NFT</span>
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            //   to="/wallet-connect"
                            className="sc-button loadmore style bag fl-button pri-3"
                            onClick={async () => {
                              setAuctionModalShow(true);
                              // console.log("nft");
                            }}
                          >
                            <span>Auction NFT</span>
                          </span> */}
                        </>
                      ) : (
                        <span
                          //   to="/wallet-connect"
                          className="sc-button loadmore style bag fl-button pri-3"
                          style={{ cursor: "no-drop" }}
                        >
                          <span>Not For Sell</span>
                        </span>
                      )
                    ) : nft?.owner === user?._id ? (
                      <button
                        className="sc-button style-place-bid style bag fl-button pri-3 disabledButton"
                        style={{ width: "100%" }}
                        // onClick={() => {
                        //   console.log(item, user)
                        // }}
                        disabled
                      >
                        You Owned
                      </button>
                    ) : nft.nftType === "bid" ? (
                      <span
                        className="sc-button loadmore style bag fl-button pri-3"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          user?._id
                            ? setBidOfferModalShow(true)
                            : navigate(`/wallet-connect/${nftId}`);
                        }}
                      >
                        <span>Bid Now</span>
                      </span>
                    ) : nft.nftType === "auction" ? (
                      <span
                        className="sc-button loadmore style bag fl-button pri-3"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          user?._id
                            ? setAuctionOfferModalShow(true)
                            : navigate(`/wallet-connect/${nftId}`);
                        }}
                      >
                        <span>Bid Now</span>
                      </span>
                    ) : (
                      <span
                        className="sc-button loadmore style bag fl-button pri-3"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          user?._id
                            ? setBuyModalShow(true)
                            : navigate(`/wallet-connect/${nftId}`);
                        }}
                      >
                        <span>Buy Nft</span>
                      </span>
                    )}
                    <div className="flat-tabs themesflat-tabs">
                      <Tabs>
                        <TabList>
                          {nft.nftType === "bid" ? (
                            <Tab>Bid History</Tab>
                          ) : null}
                          {nft.nftType === "auction" ? (
                            <Tab>Auction History</Tab>
                          ) : null}
                          <Tab>Info</Tab>
                          <Tab>Provenance</Tab>
                          <Tab>Royalites</Tab>
                          <Tab>Utilites</Tab>
                        </TabList>
                        {nft.nftType === "bid" ? (
                          <TabPanel>
                            <ul className="bid-history-list">
                              {props.allBidOffers &&
                                props.allBidOffers.map((item, index) => (
                                  <li
                                    key={index}
                                    item={item}
                                    style={
                                      loaderCancel === index
                                        ? { opacity: 0.5 }
                                        : { opacity: 1 }
                                    }
                                  >
                                    <div className="content">
                                      <div className="client">
                                        <div className="sc-author-box style-2">
                                          <div className="author-avatar">
                                            <Link to="#">
                                              <img
                                                src={
                                                  item.bidderObject[0]
                                                    ?.profile_img
                                                    ? item.bidderObject[0]
                                                        ?.profile_img
                                                    : avt
                                                }
                                                alt="Axies"
                                                className="avatar"
                                              />
                                            </Link>
                                            <div className="badge"></div>
                                          </div>
                                          <div className="author-infor">
                                            <div className="name">
                                              <h6>
                                                <Link to="/author-02">
                                                  {
                                                    item.bidderObject[0]
                                                      ?.full_Name
                                                  }{" "}
                                                </Link>
                                              </h6>{" "}
                                              <span> place a bid</span>
                                            </div>
                                            <span className="time">
                                              {item.time}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="price bidOptions">
                                        <h5>{item.bid_price}</h5>
                                        {nft?.owner === user?._id ? (
                                          <span
                                            onClick={() => {
                                              acceptBid(item);
                                            }}
                                          >
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"></path>
                                            </svg>
                                          </span>
                                        ) : (
                                          <Dropdown
                                            className="d-inline mx-2 dropdownActive"
                                            autoClose="outside"
                                          >
                                            <Dropdown.Toggle
                                              id="dropdown-autoclose-outside"
                                              className="toggleButtonAction"
                                            >
                                              <span>
                                                <svg
                                                  stroke="currentColor"
                                                  fill="none"
                                                  stroke-width="0"
                                                  viewBox="0 0 24 24"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 8h16M4 16h16"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                              <Dropdown.Item
                                                className="actionItem"
                                                onClick={() => {
                                                  setEditBidObj({
                                                    nft_id: item.nft_id,
                                                    bidder_id: item.bidder_id,
                                                    bidder_wallet_address:
                                                      item.bidder_wallet_address,
                                                    bid_price: item.bid_price,
                                                    bid_id: item._id,
                                                  });
                                                  setBidOfferModalShow(true);
                                                }}
                                              >
                                                <svg
                                                  stroke="currentColor"
                                                  fill="currentColor"
                                                  stroke-width="0"
                                                  viewBox="0 0 1024 1024"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                                                </svg>
                                                Edit Bid
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                className="actionItem"
                                                onClick={() =>
                                                  cancelBidOffer(item, index)
                                                }
                                              >
                                                <svg
                                                  stroke="currentColor"
                                                  fill="currentColor"
                                                  stroke-width="0"
                                                  version="1.1"
                                                  viewBox="0 0 16 16"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
                                                  <path d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"></path>
                                                </svg>
                                                Cancel Bid
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </TabPanel>
                        ) : null}
                        {nft.nftType === "auction" ? (
                          <TabPanel>
                            <ul className="bid-history-list">
                              {props.allAuctionOffers &&
                                props.allAuctionOffers.map((item, index) => (
                                  <li
                                    key={index}
                                    item={item}
                                    style={
                                      loaderCancel === index
                                        ? { opacity: 0.5 }
                                        : { opacity: 1 }
                                    }
                                  >
                                    <div className="content">
                                      <div className="client">
                                        <div className="sc-author-box style-2">
                                          <div className="author-avatar">
                                            <Link to="#">
                                              <img
                                                src={
                                                  item.auctionerObject[0]
                                                    ?.profile_img
                                                    ? item.auctionerObject[0]
                                                        ?.profile_img
                                                    : avt
                                                }
                                                alt="Axies"
                                                className="avatar"
                                              />
                                            </Link>
                                            <div className="badge"></div>
                                          </div>
                                          <div className="author-infor">
                                            <div className="name">
                                              <h6>
                                                <Link to="/author-02">
                                                  {
                                                    item.auctionerObject[0]
                                                      ?.full_Name
                                                  }{" "}
                                                </Link>
                                              </h6>{" "}
                                              <span> place a bid</span>
                                            </div>
                                            <span className="time">
                                              {item.time}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="price bidOptions">
                                        <h5>{item.auction_price}</h5>
                                        {nft?.owner === user?._id ? (
                                          <span
                                            onClick={() => {
                                              acceptAuction(item);
                                            }}
                                          >
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"></path>
                                            </svg>
                                          </span>
                                        ) : (
                                          <Dropdown
                                            className="d-inline mx-2 dropdownActive"
                                            autoClose="outside"
                                          >
                                            <Dropdown.Toggle
                                              id="dropdown-autoclose-outside"
                                              className="toggleButtonAction"
                                            >
                                              <span>
                                                <svg
                                                  stroke="currentColor"
                                                  fill="none"
                                                  stroke-width="0"
                                                  viewBox="0 0 24 24"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 8h16M4 16h16"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                              <Dropdown.Item
                                                className="actionItem"
                                                onClick={() => {
                                                  setEditAuctionObj({
                                                    nft_id: item.nft_id,
                                                    auctioner_id:
                                                      item.auctioner_id,
                                                    auctioner_wallet_address:
                                                      item.auctioner_wallet_address,
                                                    auction_price:
                                                      item.auction_price,
                                                    auction_id: item._id,
                                                  });
                                                  setAuctionOfferModalShow(
                                                    true
                                                  );
                                                }}
                                              >
                                                <svg
                                                  stroke="currentColor"
                                                  fill="currentColor"
                                                  stroke-width="0"
                                                  viewBox="0 0 1024 1024"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                                                </svg>
                                                Edit Bid
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                className="actionItem"
                                                onClick={() =>
                                                  cancelAuctionOffer(
                                                    item,
                                                    index
                                                  )
                                                }
                                              >
                                                <svg
                                                  stroke="currentColor"
                                                  fill="currentColor"
                                                  stroke-width="0"
                                                  version="1.1"
                                                  viewBox="0 0 16 16"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
                                                  <path d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"></path>
                                                </svg>
                                                Cancel Bid
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </TabPanel>
                        ) : null}
                        <TabPanel>
                          <div className="provenance">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <ul className="bid-history-list">
                            {dataHistory.map((item, index) => (
                              <li key={index} item={item}>
                                <div className="content">
                                  <div className="client">
                                    <div className="sc-author-box style-2">
                                      <div className="author-avatar">
                                        <Link to="#">
                                          <img
                                            src={img3}
                                            alt="Axies"
                                            className="avatar"
                                          />
                                        </Link>
                                        <div className="badge"></div>
                                      </div>
                                      <div className="author-infor">
                                        <div className="name">
                                          <h6>
                                            <Link to="/author-02">
                                              {item.name}{" "}
                                            </Link>
                                          </h6>{" "}
                                          <span> place a bid</span>
                                        </div>
                                        <span className="time">
                                          {item.time}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="price">
                                    <h5>{item.price}</h5>
                                    <span>= {item.priceChange}</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </TabPanel>
                        <TabPanel>
                          <ul className="bid-history-list">
                            <li>
                              <div className="content">
                                <div className="client">
                                  <div className="sc-author-box style-2">
                                    <div className="author-avatar">
                                      <Link to="#">
                                        <img
                                          src={img3}
                                          alt="Axies"
                                          className="avatar"
                                        />
                                      </Link>
                                      <div className="badge"></div>
                                    </div>
                                    <div className="author-infor">
                                      <div className="name">
                                        <h6>
                                          {" "}
                                          <Link to="/author-02">
                                            Mason Woodward{" "}
                                          </Link>
                                        </h6>{" "}
                                        <span> place a bid</span>
                                      </div>
                                      <span className="time">8 hours ago</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </TabPanel>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SellModal show={sellModalShow} onHide={() => setSellModalShow(false)} />
      <BidModal show={bidModalShow} onHide={() => setBidModalShow(false)} />
      <BidOfferModal
        nft={nft}
        show={bidOfferModalShow}
        onHide={() => setBidOfferModalShow(false)}
        editObjBidObj={editObjBidObj}
        setEditBidObj={setEditBidObj}
      />
      <AuctionModal
        show={auctionModalShow}
        onHide={() => setAuctionModalShow(false)}
      />
      <AuctionOfferModal
        nft={nft}
        show={auctionOfferModalShow}
        onHide={() => setAuctionOfferModalShow(false)}
        editObjAuctionObj={editObjAuctionObj}
        setEditAuctionObj={setEditAuctionObj}
      />
      <BuyModal show={buyModalShow} onHide={() => setBuyModalShow(false)} />
      <LiveAuction data={liveAuctionData} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  allBidOffers: state.wallet.allBidOffers,
  allAuctionOffers: state.wallet.allAuctionOffers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSingleNft,
      bidOffers,
      cancelBidOffers,
      acceptBidOffers,
      auctionOffers,
      acceptAuctionOffers,
      cancelAuctionOffers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails02);

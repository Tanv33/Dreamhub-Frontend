import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";
import imga7 from "../assets/images/No_image_available.webp";
import cover from "../assets/images/cover.jpg";
import { useEffect } from "react";
import {
  getUserCreatedNfts,
  getUserNFT,
  getUserNftsOnSell,
  getUserProfile,
} from "../module/action/user-task";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import HeaderNew from "../components/header/HeaderNew";
import { Button } from "bootstrap";
import { useAlert } from "react-alert";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
const Authors02 = (props) => {
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

  const userProfile = useSelector((e) => e.wallet.userProfile);
  const UserNFTS = useSelector((e) => e.wallet.userNFTS);
  const userCreatedNfts = useSelector((e) => e.wallet.userCreatedNfts);
  const signedInUser = useSelector((e) => e.User.signedInUser);
  const userNftsOnSell = useSelector((e) => e.wallet.userNftsOnSell);
  const [profile, setProfile] = useState({});
  const [NFTS, setNFTS] = useState([]);
  const [createdNfts, setCreatedNfts] = useState([]);
  const [userSellNfts, setUserSellNfts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  let alert = useAlert();
  useEffect(() => {
    if (userNftsOnSell?.length) {
      setUserSellNfts(userNftsOnSell);
      console.log(userNftsOnSell);
    }
  }, [userNftsOnSell]);

  useEffect(() => {
    if (userCreatedNfts?.length) {
      setCreatedNfts(userCreatedNfts);
      // console.log(userCreatedNfts);
    }
  }, [userCreatedNfts]);
  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);
  useEffect(() => {
    if (UserNFTS?.length) {
      setNFTS(UserNFTS);
      // console.log(UserNFTS);
    }
  }, [UserNFTS]);

  const walletType = useSelector((e) => e.wallet.walletType);
  console.log({ walletType });

  const [url, seturl] = useState(new URL(window.location));
  var [userId, setUserId] = useState(url.searchParams.get("id"));
  // const [id,setId]

  // useEffect(() => {
  //   let url =
  //     let id = url.searchParams.get('id')
  //   setUserId(id)
  // }, [])

  useEffect(() => {
    if (userId) {
      props.getUserProfile(userId);
      props.getUserNFT(userId);
    }
  }, [userId]);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);

  // const getNftsFromWallet = async () => {
  //   // const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  //   // const address = "0x08674a2536F6b5A7Bdf8B7527CF6f41F818BaEF9";
  //   const address = profile?.username;
  //   const chain = EvmChain.GOERLI;
  //   // const chain = EvmChain.ETHEREUM;
  //   await Moralis.start({
  //     apiKey:
  //       "lrjyYpDNgavPt3pF9a1yuiauaL2VKfnNRbn75lTroqZPY5YHO4kLO974B80w5VgV",
  //     // ...and any other configuration
  //   });
  //   try {
  //     // const response = await Moralis.EvmApi.nft.getWalletNFTCollections({
  //     // const response = await Moralis.EvmApi.nft.getContractNFTs({
  //     const response = await Moralis.EvmApi.nft.getWalletNFTs({
  //       // const response = await Moralis.EvmApi.nft.getNFTContractTransfers({
  //       address,
  //       // address: "0xf4910C763eD4e47A585E2D34baA9A4b611aE448C", // testnet opensea contract
  //       // address: "0x86ef335cb0ada3c681ec4240ef6520c407adeb0b", // mainnet opensea contract

  //       chain,
  //     });
  //     console.log("first", response);
  //     callNextNFtsFromWallet(response);

  //     async function callNextNFtsFromWallet(response) {
  //       const nfts = response.hasNext();
  //       console.log("newadadad", nfts);
  //       if (nfts) {
  //         const newNfts = await response.next();
  //         console.log(newNfts);
  //         if (newNfts.hasNext()) {
  //           callNextNFtsFromWallet(newNfts);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert.error("Something went wrong while getting docs using moralis");
  //   }
  // };
  return (
    <div className="authors-2">
      {/* <ParticleComponent /> */}

      <HeaderNew search={true} setSearch={false} />

      <section className="flat-title-page">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">{profile?.full_Name}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section authors">
        <div className="tayson" />
        <div className="themesflat-container">
          <div className="flat-tabs tab-authors">
            <div
              className="author-profile flex"
              style={
                profile?.cover_img
                  ? {
                      backgroundImage: `url('${profile?.cover_img}')`,
                    }
                  : { backgroundImage: `url('${cover}')` }
              }
            >
              <div className="feature-profile">
                {profile?.profile_img ? (
                  <img
                    src={profile?.profile_img}
                    alt="profile image"
                    className="avatar"
                  />
                ) : (
                  <img src={imga7} alt="profile image" className="avatar" />
                )}
              </div>
              <div className="infor-profile">
                <span>Profile</span>
                <h2 className="title"> {profile?.full_Name}</h2>
                <p className="content">{profile?.bio}</p>
                {profile?.username ? 
                <form>
                  <input
                    type="text"
                    className="inputcopy"
                    defaultValue={profile?.username}
                    readOnly
                  />
                  <button type="button" className="btn-copycode">
                    <i className="icon-fl-file-1"></i>
                  </button>
                </form>
                :null}
              </div>
              <div className="widget-social style-3">
                <ul>
                  <li>
                    <a href={profile.twitter} target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={profile.facebook} target="_blank">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li className="style-2">
                    <a href={profile.instagram} target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  {/* <li className="mgr-none">
                    <Link to="#">
                      <i className="icon-fl-tik-tok-2"></i>
                    </Link>
                  </li> */}
                </ul>
                {/* <div className="btn-profile"> */}
                  {/* <button
                    className="sc-button style-1 follow"
                    onClick={getNftsFromWallet}
                  >
                    Import NFTs
                  </button> */}
                {/* </div> */}
              </div>
            </div>
            <Tabs>
              <TabList>
                {/* {menuTab.map((item, index) => (
                  <Tab key={index}>{item.name}</Tab>
                ))} */}
                <Tab
                  key={0}
                  onClick={() => {
                    setActiveTab(0);
                    props.getUserNFT(userId);
                  }}
                >
                  Collected
                </Tab>
                <Tab
                  key={1}
                  onClick={() => {
                    setActiveTab(1);
                    props.getUserCreatedNfts(userId);
                  }}
                >
                  Created
                </Tab>
                <Tab
                  key={2}
                  onClick={() => {
                    setActiveTab(2);
                    props.getUserNftsOnSell(userId);
                  }}
                >
                  On Sell
                </Tab>
              </TabList>

              <div className="content-tab">
                <div className="content-inner">
                  <div className="row">
                    <TabPanel key={0}>
                      {NFTS?.map((data, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-12"
                        >
                          <div className="mainSilde">
                            <div className="slider-item itemBackground"></div>
                            <Link to="/login" className="wishlist-button heart">
                              <span className="number-like">
                                {" "}
                                {data.wishlist}
                              </span>
                            </Link>

                            {/* <div className="button-place-bid">
                              {" "}
                              <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3">
                                <span>Buy Now</span>
                              </button>
                            </div>
                          */}
                            <Link
                              className="nftLinkDIv"
                              to={`/item-details-02/${data?._id}`}
                            >
                              <div
                                className="NFTCardCust"
                                style={{
                                  backgroundImage: `url('${data.nftImg}')`,
                                }}
                              >
                                {/* <div className='cardDetailParent'> */}

                                <div className="cardDetail">
                                  <div className="row1Details">
                                    <div className="nameBox">
                                      <h5>{data.title}</h5>

                                      <p>{data?.ownerObject[0]?.full_Name}</p>
                                    </div>

                                    <div className="priceBox">
                                      {/* <h4>{data?.actualPrice} ETH</h4> */}
                                      {data?.actualPrice ? (
                                        <h4>{data?.actualPrice} ETH</h4>
                                      ) : (
                                        <h4>
                                          {
                                            data?.events?._listOnSale
                                              ?.returnValues?.price
                                          }{" "}
                                          ETH
                                        </h4>
                                      )}
                                      {/* <div className='lastPrice'>
                                        <p>last Price</p>
                                        <p>32.22</p>
                                      </div> */}
                                    </div>
                                  </div>
                                  <div className="row2Details">
                                    <div className="id">
                                      <h5>
                                        {" "}
                                        #
                                        {data?.events?._listOnSale?.returnValues
                                          ?.tokenId ||
                                          data?.events?._BuyMarketItem
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Transfer?.returnValues
                                            ?.tokenId ||
                                          data?.events?.Transfer[0]
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Trade?.returnValues
                                            ?.tokenId}
                                      </h5>
                                    </div>
                                    <div className="detail">
                                      <p>{data?.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        // {/* <div className="col-md-12 wrap-inner load-more text-center">
                        //   <Link
                        //     to="#"
                        //     id="load-more"
                        //     className="sc-button loadmore fl-button pri-3"
                        //     onClick={showMoreItems}
                        //   >
                        //     <span>Load More</span>
                        //   </Link>
                        // </div> */}
                      ))}
                    </TabPanel>
                    <TabPanel key={1}>
                      {createdNfts?.map((data, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-12"
                        >
                          <div className="mainSilde">
                            <div className="slider-item itemBackground"></div>
                            <Link to="/login" className="wishlist-button heart">
                              <span className="number-like">
                                {" "}
                                {data.wishlist}
                              </span>
                            </Link>
                            {/* <div className="button-place-bid"> */}{" "}
                            {/* <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3">
                                <span>Buy Now</span>
                              </button> */}
                            {/* </div> */}
                            <Link
                              className="nftLinkDIv"
                              to={`/item-details-02/${data?._id}`}
                            >
                              <div
                                className="NFTCardCust"
                                style={{
                                  backgroundImage: `url('${data.nftImg}')`,
                                }}
                              >
                                {/* <div className='cardDetailParent'> */}

                                <div className="cardDetail">
                                  <div className="row1Details">
                                    <div className="nameBox">
                                      <h5>{data.title}</h5>

                                      <p>{data?.ownerObject[0]?.full_Name}</p>
                                    </div>

                                    <div className="priceBox">
                                      {/* <h4>{data?.actualPrice} ETH</h4> */}
                                      {data?.actualPrice ? (
                                        <h4>{data?.actualPrice} ETH</h4>
                                      ) : (
                                        <h4>
                                          {
                                            data?.events?._listOnSale
                                              ?.returnValues?.askPrice
                                          }{" "}
                                          ETH
                                        </h4>
                                      )}
                                      {/* <div className='lastPrice'>
                                        <p>last Price</p>
                                        <p>32.22</p>
                                      </div> */}
                                    </div>
                                  </div>
                                  <div className="row2Details">
                                    <div className="id">
                                      <h5>
                                        #
                                        {data?.events?._listOnSale?.returnValues
                                          ?.tokenId ||
                                          data?.events?._BuyMarketItem
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Transfer[0]
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Trade?.returnValues
                                            ?.tokenId}
                                      </h5>
                                    </div>
                                    <div className="detail">
                                      <p>{data?.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        // {/* <div className="col-md-12 wrap-inner load-more text-center">
                        //   <Link
                        //     to="#"
                        //     id="load-more"
                        //     className="sc-button loadmore fl-button pri-3"
                        //     onClick={showMoreItems}
                        //   >
                        //     <span>Load More</span>
                        //   </Link>
                        // </div> */}
                      ))}
                    </TabPanel>

                    <TabPanel key={2}>
                      {userSellNfts?.map((data, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-12"
                        >
                          <div className="mainSilde">
                            <div className="slider-item itemBackground"></div>
                            <Link to="/login" className="wishlist-button heart">
                              <span className="number-like">
                                {" "}
                                {data.wishlist}
                              </span>
                            </Link>
                            {signedInUser &&
                            data.ownerObject[0]._id ===
                              signedInUser._id ? null : (
                              <div className="button-place-bid">
                                {" "}
                                <button
                                  onClick={() => setModalShow(true)}
                                  className="sc-button style-place-bid style bag fl-button pri-3"
                                  disabled
                                >
                                  <span>Coming Soon</span>
                                </button>
                              </div>
                            )}
                            <Link
                              className="nftLinkDIv"
                              to={`/item-details-02/${data?._id}`}
                            >
                              <div
                                className="NFTCardCust"
                                style={{
                                  backgroundImage: `url('${data.nftImg}')`,
                                }}
                              >
                                {/* <div className='cardDetailParent'> */}

                                <div className="cardDetail">
                                  <div className="row1Details">
                                    <div className="nameBox">
                                      <h5>{data.title}</h5>

                                      <p>{data?.creatorObject[0]?.full_Name}</p>
                                    </div>

                                    <div className="priceBox">
                                      {data?.actualPrice ? (
                                        <h4>{data?.actualPrice} ETH</h4>
                                      ) : (
                                        <h4>
                                          {
                                            data?.events?._lisOnSale
                                              ?.returnValues?.askPrice
                                          }{" "}
                                          ETH
                                        </h4>
                                      )}
                                      {/* <h4>{data?.actualPrice} ETH</h4> */}
                                      {/* <div className='lastPrice'>
                                        <p>last Price</p>
                                        <p>32.22</p>
                                      </div> */}
                                    </div>
                                  </div>
                                  <div className="row2Details">
                                    <div className="id">
                                      <h5>
                                        #
                                        {data?.events?._listOnSale?.returnValues
                                          ?.tokenId ||
                                          data?.events?._BuyMarketItem
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Transfer?.returnValues
                                            ?.tokenId ||
                                          data?.events?.Transfer[0]
                                            ?.returnValues?.tokenId ||
                                          data?.events?.Trade?.returnValues
                                            ?.tokenId}
                                      </h5>
                                    </div>
                                    <div className="detail">
                                      <p>{data?.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        // {/* <div className="col-md-12 wrap-inner load-more text-center">
                        //   <Link
                        //     to="#"
                        //     id="load-more"
                        //     className="sc-button loadmore fl-button pri-3"
                        //     onClick={showMoreItems}
                        //   >
                        //     <span>Load More</span>
                        //   </Link>
                        // </div> */}
                      ))}
                    </TabPanel>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
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
      getUserProfile,
      getUserNFT,
      getUserCreatedNfts,
      getUserNftsOnSell,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Authors02);

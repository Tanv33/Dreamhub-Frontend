import React, { useCallback, useEffect, useState } from "react";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import CardItem from "../components/layouts/home-4/CardItem";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/home-4/LiveAuction";
import TopSeller from "../components/layouts/home-2/TopSeller";
import topSellerData from "../assets/fake-data/data-top-seller";
import TodayPicks from "../components/layouts/home-4/TodayPicks";
import todayPickData from "../assets/fake-data/data-today-pick";
import PopularCollection from "../components/layouts/PopularCollection";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import Create from "../components/layouts/Create";
import { bindActionCreators } from "redux";
import { getConnectWallet } from "../module/action/wallet";
import { connect, useSelector } from "react-redux";
import {
  getNFTSOnSell,
  getNFTSOnBid,
  getNFTSOnAuction,
} from "../module/action/user-task";
import NftOnSell from "../components/layouts/home-4/nftOnSell";
import SearchSection from "../components/layouts/home-4/SearchSection";
import { ParticleComponent } from "./ParticleComponent";
import Header from "../components/header/HeaderNew";
import SpotLight from "../components/layouts/home-4/SpotLight";
import HeaderNew from "../components/header/HeaderNew";
import DarkMode from "../components/header/DarkMode";
import BidOnSell from "../components/layouts/home-4/nftOnBid";
import AuctionOnSell from "../components/layouts/home-4/nftOnAuction";
const Home01 = (props) => {
  const [nftsOnSell, setNftsOnSell] = useState([]);
  const [nftsOnBid, setNftsOnBid] = useState([]);
  const [nftsOnAuction, setNftsOnAuction] = useState([]);
  const sellNFTs = useSelector((e) => e.wallet.sellNFTS);
  const bidNFTs = useSelector((e) => e.wallet.bidNFTS);
  const auctionNFTs = useSelector((e) => e.wallet.auctionNFTS);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (sellNFTs) {
      setNftsOnSell(sellNFTs);
      console.log(sellNFTs);
    }
  }, [sellNFTs]);
  useEffect(() => {
    if (bidNFTs) {
      setNftsOnBid(bidNFTs);
      console.log(bidNFTs);
    }
  }, [bidNFTs]);
  useEffect(() => {
    if (auctionNFTs) {
      setNftsOnAuction(auctionNFTs);
      console.log(auctionNFTs);
    }
  }, [auctionNFTs]);
  useEffect(() => {
    props.getNFTSOnSell();
    props.getNFTSOnBid();
    props.getNFTSOnAuction();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    // console.log('runnn')
    // return () => {
    //   window.removeEventListener('scroll', isSticky);
    // };
  }, []);
  const [onHeader, setOnHeader] = useState(false);
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header?.classList?.add("is-fixed")
      : header?.classList?.remove("is-fixed");
    scrollTop >= 400
      ? header?.classList?.add("is-small")
      : header?.classList?.remove("is-small");
    // console.log(search, onHeader, "onHeaderonHeader");
    if (scrollTop >= 300) {
      setSearch(true);
      setOnHeader(true);
    } else {
      setSearch(false);
      setOnHeader(false);
    }
    // console.log(scrollTop)
  };
  // debugger
  return (
    <div className="home-4">
      {/* <ParticleComponent /> */}
      <HeaderNew search={search} setSearch={setSearch} onHeader={onHeader} />
      <SearchSection setSearch={setSearch} onHeader={onHeader} />
      <PopularCollection data={popularCollectionData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      {nftsOnSell.length ? <NftOnSell data={nftsOnSell} /> : null}
      {nftsOnBid.length ? <BidOnSell data={nftsOnBid} /> : null}
      {nftsOnAuction.length ? <AuctionOnSell data={nftsOnAuction} /> : null}
      <Create />
      <Create />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  // connectedWallet: state.wallet,
  connectedWallet: state.wallet.connectedWallet,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getConnectWallet,
      getNFTSOnSell,
      getNFTSOnBid,
      getNFTSOnAuction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home01);

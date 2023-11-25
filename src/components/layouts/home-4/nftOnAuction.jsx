import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardModal from "../CardModal";
import { BASE_URL } from "../../../constants";
import BuyModal from "../BuyModal";
import { useSelector } from "react-redux";
import NetworkModal from "../NetworkModal";

const AuctionOnSell = (props) => {
  const data = props.data;
  const user = useSelector((e) => e.wallet.user);

  const [visible, setVisible] = useState(8);
  const [itemNFT, setItemNFT] = useState(false);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (itemNFT) {
      setModalShow(true);
    }
  }, [itemNFT]);
  // console.log(user)
  // console.log(data,'nftData')

  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7">NFT's On Auction</h2>
                <Link to="/explore-04" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            {data.length ? (
              // data.slice(0, visible).map((item, index) => (
              data?.map((item, index) => (
                <div
                  key={index}
                  className="todyaPick col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <div className="mainSilde">
                    <div className="slider-item itemBackground"></div>
                    <Link to="/login" className="wishlist-button heart">
                      <span className="number-like">10</span>
                    </Link>

                    <div className="button-place-bid">
                      {" "}
                      {user && item.ownerObject[0]._id === user._id ? (
                        <button
                          className="sc-button style-place-bid style bag fl-button pri-3 disabledButton"
                          // onClick={() => {
                          //   console.log(item, user)
                          // }}
                          disabled
                        >
                          You Owned
                        </button>
                      ) : (
                        <button
                          onClick={() => setItemNFT(item)}
                          className="sc-button style-place-bid style bag fl-button pri-3"
                        >
                          <span>Buy Now</span>
                        </button>
                      )}
                    </div>
                    <Link
                      className="nftLinkDIv"
                      to={`/item-details-02/${item?._id}`}
                    >
                      <div
                        className="NFTCardCust"
                        style={{
                          // backgroundImage: `url('${`${BASE_URL}/api/v1/user/nft/nft-view-image/${item?.nftImg}`}')`,
                          backgroundImage: `url('${item?.nftImg}')`,
                        }}
                      >
                        <div className="cardDetail">
                          <div className="row1Details">
                            <div className="nameBox">
                              <h5>{item?.title}</h5>
                              <h5></h5>
                              <p>{item?.ownerObject[0]?.full_Name}</p>
                            </div>
                            <div className="priceBox">
                              {item?.actualPrice ? (
                                <h4>{item?.actualPrice} ETH</h4>
                              ) : (
                                <h4>
                                  {
                                    item?.events?._listOnSale?.returnValues
                                      ?.price
                                  }{" "}
                                  ETH
                                </h4>
                              )}
                            </div>
                          </div>
                          <div className="row2Details">
                            <div className="id">
                              <h5>
                                #
                                {item?.events?._listOnSale?.returnValues
                                  ?.tokenId ||
                                  item?.events?._listOnSale?.Transfer
                                    ?.returnValues?.tokenId ||
                                  item?.events?.Transfer[0]?.returnValues
                                    ?.tokenId ||
                                  item?.events?._listOnSale?.Trade?.returnValues
                                    ?.tokenId}
                              </h5>
                            </div>
                            <div className="detail">
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="noNftSell">there is no nft on sell</p>
            )}
            {/* {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </section>
      <BuyModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setItemNFT();
        }}
        itemNFT={itemNFT}
        setItemNFT={setItemNFT}
      />
    </Fragment>
  );
};

AuctionOnSell.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AuctionOnSell;

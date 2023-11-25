import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardModal from "../CardModal";

const TodayPicks = (props) => {
    const data = props.data;

    const [visible, setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    };

    const [modalShow, setModalShow] = useState(false);
    return (
        <Fragment>
            <section className="tf-section today-pick">

                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions mg-bt-21">
                                <h2 className="tf-title pad-l-7">Today's Picks</h2>
                                <Link to="/explore-04" className="exp style2">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        {data.slice(0, visible).map((item, index) => (
                            <div
                                key={index}
                                className="todyaPick col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <div className="mainSilde">
                                    <div className="slider-item itemBackground"></div>
                                    <Link to="/login" className="wishlist-button heart"> <span className="number-like">10</span></Link>

                                    <div className="button-place-bid">
                                        <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Buy Now</span></button>

                                    </div>
                                    <Link className="nftLinkDIv" to={`/item-details-02/${item?._id}`}>
                                        <div
                                            className="NFTCardCust"
                                            style={{ backgroundImage: `url('${item.img}')` }}
                                        >

                                            <div className='cardDetail'>
                                                <div className='row1Details'>

                                                    <div className='nameBox'>
                                                        <h5>{item.title}</h5>

                                                        <p>{item.nameAuthor}</p>
                                                    </div>

                                                    <div className='priceBox'>
                                                        <h4>{item.price}</h4>
                                                        <div className='lastPrice'>
                                                            <p>last Price</p>
                                                            <p>32.22</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row2Details'>
                                                    <div className='id'>
                                                        <h5>#A236</h5>
                                                    </div>
                                                    <div className='detail'>
                                                        <p>dasdasdasdasd asd asd as das d asd asd as das</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                        ))}
                        {visible < data.length && (
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
                        )}
                    </div>
                </div>
            </section>
            <CardModal show={modalShow} onHide={() => setModalShow(false)} />
        </Fragment>
    );
};

TodayPicks.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TodayPicks;

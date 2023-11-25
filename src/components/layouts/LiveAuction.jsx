import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import CardModal from './CardModal'

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const LiveAuction = props => {
    const data = props.data;

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="tayson" />
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-20">
                                    Live Auctions</h2>
                                <Link to="/explore-03" className="exp style2">EXPLORE MORE</Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                        slidesPerView: 2,
                                    },
                                    991: {
                                        slidesPerView: 3,
                                    },
                                    1300: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {
                                    data.slice(0, 7).map((data, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="swiper-container show-shadow carousel auctions">
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        <div className="slider-item">
                                                            <div className='mainSilde'>
                                                                <Link to="/login" className="wishlist-button heart"><span className="number-like"> {data.wishlist}</span></Link>

                                                                <div className="button-place-bid">
                                                                    <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Buy Now</span></button>
                                                                </div>
                                                                <div className='slider-item itemBackground'>
                                                                </div>
                                                                <Link className="nftLinkDIv" to={`/item-details-02/${data._id}`}>
                                                                    <div className="NFTCardCust" style={{ backgroundImage: `url('${data.img}')` }}>
                                                                        {/* <div className='cardDetailParent'> */}

                                                                        <div className='cardDetail'>
                                                                            <div className='row1Details'>

                                                                                <div className='nameBox'>
                                                                                    <h5>{data.title}</h5>

                                                                                    <p>profile name</p>
                                                                                </div>

                                                                                <div className='priceBox'>
                                                                                    <h4>{data?.cumulativeGasUsed}</h4>
                                                                                    <div className='lastPrice'>
                                                                                        <p>last Price</p>
                                                                                        <p>32.22</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row2Details'>
                                                                                <div className='id'>
                                                                                    <h5>#{data.blockNumber}</h5>
                                                                                </div>
                                                                                <div className='detail'>
                                                                                    <p>{data?.description}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>

    );
}

LiveAuction.propTypes = {
    data: PropTypes.array.isRequired,
}


export default LiveAuction;

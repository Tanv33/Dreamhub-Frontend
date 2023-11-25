import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import CardModal from '../CardModal';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const LiveAuction = props => {
    const data = props.data;

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions">

                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-20">
                                    Live Auctions</h2>
                                <Link to="/explore-04" className="exp style2">EXPLORE MORE</Link>
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
                                    data.slice(0, 7).map((item, index) => (
                                        <div key={index}>
                                            <SwiperSlide key={index}>
                                                <div className='mainSilde'>
                                                    <div className='slider-item itemBackground'>
                                                    </div>
                                                    <Link to="/login" className="wishlist-button heart"> <span className="number-like">10</span></Link>

                                                    <div className="button-place-bid">
                                                        <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Buy Now</span></button>

                                                    </div>
                                                    <Link className="nftLinkDIv" to={`/item-details-02/${item?._id}`}>
                                                        <div className="NFTCardCust" style={{ backgroundImage: `url('${item.img}')` }}>
                                                            {/* <div className='cardDetailParent'> */}

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
                                            </SwiperSlide>

                                            {/* <SwiperSlide key={index}>
                                            <div className="swiper-container show-shadow carousel auctions">
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        <div className="slider-item">										
                                                            <div className="sc-card-product menu_card">
                                                                <div className="meta-info style">
                                                                    <div className="author">
                                                                        <div className="avatar">
                                                                            <img src={item.imgCollection} alt="Axies" />
                                                                        </div>
                                                                        <div className="info">
                                                                            <span>Collection</span>
                                                                            <h6> <Link to="/authors-02">{item.nameCollection}</Link> </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="menu_card">
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle id="dropdown-basic">
                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu style={{ margin: 0 }}>
                                                                        <Dropdown.Item href="#">
                                                                            Refresh Metadata
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item href="#">
                                                                            Share
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item href="#">
                                                                            Report
                                                                        </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="card-media">
                                                                    <Link to="/item-details-02"><img src={item.img} alt="Axies" /></Link>
                                                                    <Link to="/login" className="wishlist-button heart"> <span className="number-like">10</span></Link>
                                                                    <div className="featured-countdown">
                                                                        <span className="slogan"></span>
                                                                        <Countdown date={Date.now() + 500000000}>
                                                                            <span>You are good to go!</span>
                                                                        </Countdown>
                                                                    </div>
                                                                    <div className="button-place-bid">
                                                                        <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></button>
                                                                    </div>
                                                                </div>
                                                                <div className="card-title">
                                                                    <h5><Link to="/item-details-02">"{item.title} "</Link></h5>
                                                                    <div className="tags">{item.tags}</div>
                                                                </div>
                                                                <div className="meta-info">
                                                                    <div className="author">
                                                                        <div className="avatar">
                                                                            <img src={item.imgAuthor} alt="Axies" />
                                                                        </div>
                                                                        <div className="info">
                                                                            <span>Creator</span>
                                                                            <h6> <Link to="/authors-02">{item.nameAuthor}
                                                                            </Link> </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <span>Current Bid</span>
                                                                        <h5>{item.price}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>      	
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide> */}
                                        </div>
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

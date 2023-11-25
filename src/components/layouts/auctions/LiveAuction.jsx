import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Countdown from "react-countdown";
import CardModal from '../CardModal';


const LiveAuction = props => {
    const data = props.data;

    const [visible, setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    }

    const [modalShow, setModalShow] = useState(false);

    return (

        <section className="tf-section live-auctions">
            <div className="tayson" />
            <div className="themesflat-container">
                <div className="row">
                    {/* <div className="col-md-12">
                        <div className="special"></div>
                        <h2 className="tf-title-heading style-1 ct">Live Auctions</h2>
                    </div> */}

                    {
                        data.slice(0, visible).map((item, index) => (
                            <LiveAuctionItem key={index} item={item} modalShow={modalShow} setModalShow={setModalShow} />
                        ))
                    }
                    {
                        visible < data.length &&
                        <div className="col-md-12 wrap-inner load-more text-center">
                            <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                        </div>
                    }
                </div>
            </div>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </section>
    );
}

LiveAuction.propTypes = {
    data: PropTypes.array.isRequired,
}

const LiveAuctionItem = props => (
    <div className="fl-item col-xl-3 col-lg-6 col-md-6">
        <div className='mainSilde'>
            <div className='slider-item itemBackground'>
            </div>
            <Link to="/login" className="wishlist-button heart"><span className="number-like"> {props.item.wishlist}</span></Link>

            <div className="button-place-bid">
                <button onClick={() => props.setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Buy Now</span></button>
            </div>
            <Link className="nftLinkDIv" to={`/item-details-02/${props.item?._id}`}>
                <div className="NFTCardCust" style={{ backgroundImage: `url('${props.item.img}')` }}>
                    {/* <div className='cardDetailParent'> */}

                    <div className='cardDetail'>
                        <div className='row1Details'>

                            <div className='nameBox'>
                                <h5>{props.item.title}</h5>

                                <p>{props.item.nameAuthor}</p>
                            </div>

                            <div className='priceBox'>
                                <h4>{props.item.price}</h4>
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


)

export default LiveAuction;

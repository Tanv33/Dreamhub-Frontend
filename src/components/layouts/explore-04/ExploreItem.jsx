import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import CardModal from '../CardModal';

const ExploreItem = props => {
    const data = props.data

    const [visible, setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 6);
    }

    const [modalShow, setModalShow] = useState(false);
    return (
        <Fragment>
            <div className='explore'>
                <div className="box-epxlore">
                    {
                        data.slice(0, visible).map((item, index) => (
                            <div className={`sc-card-product explode style2 mg-bt ${item.feature ? 'comingsoon' : ''} `} key={index}>
                                <div className='mainSilde'>
                                    <div className='slider-item itemBackground'>
                                    </div>
                                    <Link to="/login" className="wishlist-button heart"> <span className="number-like">10</span></Link>

                                    <div className="button-place-bid">
                                        <button onClick={() => setModalShow(true)}className="sc-button style-place-bid style bag fl-button pri-3"><span>Buy Now</span></button>

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
                            </div>
                        ))
                    }
                </div>
                {
                    visible < data.length &&
                    <div className="btn-auction center">
                        <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                    </div>
                }
            </div>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
    );
}

export default ExploreItem;

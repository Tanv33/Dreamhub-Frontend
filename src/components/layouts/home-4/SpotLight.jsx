import React, { useState, Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper';
import Countdown from "react-countdown";
import CardModal from '../CardModal';
import SneakyPlayer from './../../../assets/sneakplayer.png'
import Haf from './../../../assets/haf.png'
import nftImage2 from './../../../assets/nftimg1.jpg'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const SpotLight = props => {
    const data = props.data;
    const [tranformPer, setTranformPer] = useState(0)
    const [numberOfActiveSlide, setNumberOfActiveSlide] = useState(3)
    const [modalShow, setModalShow] = useState(false);
    const [noOfSlides, setNoOfSlides] = useState(3);
    const navigate = useNavigate()

    const [imagesArr, setImagesArr] = useState([
        {
            img: SneakyPlayer,
            name: 'Sneak Player',
            link:'/launchpad'
        },
        {
            img: Haf,
            name: 'HAF METAVERSE',
        },
        {
            img: nftImage2,
            name: 'rektu',
        }
    ])
    // const [windowWidthState, setWindowWidthState] = useState(window.innerWidth)

    // const moveSlide = (dir) => {
    //     const slideLimit = ((9 / numberOfActiveSlide) - 1) * 100
    //     if (dir === "prev") {
    //         if (tranformPer < 0) {
    //             setTranformPer(tranformPer + 100)
    //         }
    //     } else if (dir === 'next') {
    //         if (-slideLimit < tranformPer) {
    //             setTranformPer(tranformPer - 100)
    //         }
    //     }
    // }

    // useEffect(() => {
    //     const windowWidth = window.innerWidth
    //     // setWindowWidthState(windowWidth)
    //     if (windowWidth > 1024) {
    //         setNoOfSlides(3)
    //         setNumberOfActiveSlide(3)
    //     } else if (windowWidth > 768) {
    //         setNoOfSlides(2)
    //         setNumberOfActiveSlide(2)
    //     } else {
    //         setNoOfSlides(1)
    //         setNumberOfActiveSlide(1)
    //     }
    //     window.addEventListener('resize', (event) => {
    //         if (event.target.innerWidth > 1024) {
    //             setNoOfSlides(3)
    //             setNumberOfActiveSlide(3)
    //         } else if (event.target.innerWidth > 768) {
    //             setNoOfSlides(2)
    //             setNumberOfActiveSlide(2)
    //         } else {
    //             setNoOfSlides(1)
    //             setNumberOfActiveSlide(1)
    //         }
    //     });
    // }, [])

    // const sliderRef = useRef(null);

    // const onScroll = () => { 
    //     console.log(sliderRef.current?.scrollLeft)
    //    }

    return (
        <Fragment>
            <section className="tf-section spotLight">
                <div className='blobShade yellow'></div>
                <div className='blobShade purple'></div>
                <div className='blobShade pink'></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-30">
                                    Spotlight. <span>Projects you'll love</span></h2>
                                {/* <Link to="/explore-04" className="exp style2">EXPLORE MORE</Link> */}
                            </div>
                        </div>
                        {/* <div className='spotLightSlider'>
                            <div className='innerSpotLightSlider'>
                                <button style={{ left: "0px" }} className="sc-bdvvtL sc-fKVqWL sc-bBHxTw sc-iwjdpV sc-cxpSdN cDiMXI QejWU jDVxPI epdneE sc-cVAmsi hKCkTi sc-hRnpUl eUVwVt" type="button" onClick={() => {
                                    moveSlide('prev')

                                }}><svg viewBox="0 0 24 24" fill="none" width="24" height="24" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-iCfMLu gDGMpz" style={{ transform: "rotate(90deg)" }}><path fillRule="evenodd" clipRule="evenodd" d="M7.46967 9.46967C7.76256 9.17678 8.23744 9.17678 8.53033 9.46967L12 12.9393L15.4697 9.46967C15.7626 9.17678 16.2374 9.17678 16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303L12.5303 14.5303C12.2374 14.8232 11.7626 14.8232 11.4697 14.5303L7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967Z" fill="currentColor"></path></svg></button>
                                <div ref={sliderRef} className='spotLightSlides' style={{ transform: `translate3d(${tranformPer}%, 0px, 0px)` }} onScroll={onScroll}>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                            <div className='spotDivSlide' style={{
                                                width: `calc(${100 / noOfSlides}% )`,
                                                minWidth: `calc(${100 / noOfSlides}% )`
                                            }}>
                                                <div className='spotDiv' style={{ backgroundImage: "url('https://res.cloudinary.com/rarible-inc/image/upload/t_featured/attachments/77a4e3c52cf166b70b9b7062968dfac3/5d26c805/WZRD.png?ts=1657271890&userId=usrXOYiFdvMkwEJIf&cs=11ccff67e85ec219')" }}>
                                                    <div className='innerSpotDiv'>
                                                        <div>
                                                            <h3>rektu</h3>
                                                            <p>New Community Marketplace</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button style={{ right: "0px" }} className="sc-bdvvtL sc-fKVqWL sc-bBHxTw sc-iwjdpV sc-cxpSdN cDiMXI QejWU jDVxPI epdneE sc-cVAmsi hKCkTi sc-hRnpUl gEnVLR" type="button" onClick={() => {
                                    moveSlide('next')
                                }}><svg viewBox="0 0 24 24" fill="none" width="24" height="24" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-iCfMLu gDGMpz" style={{ transform: "rotate(-90deg)" }}><path fillRule="evenodd" clipRule="evenodd" d="M7.46967 9.46967C7.76256 9.17678 8.23744 9.17678 8.53033 9.46967L12 12.9393L15.4697 9.46967C15.7626 9.17678 16.2374 9.17678 16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303L12.5303 14.5303C12.2374 14.8232 11.7626 14.8232 11.4697 14.5303L7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967Z" fill="currentColor"></path></svg></button>
                            </div>
                        </div> */}

                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                                navigation={true}
                                spaceBetween={30}
                                mousewheel={{
                                    // invert: true,
                                    forceToAxis: true,
                                    releaseOnEdges: true,
                                    sensitivity: 1
                                }}
                                slidesPerGroup={3}
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
                                        slidesPerView: 3,
                                    },
                                }}
                                pagination={{ clickable: true }}
                                scrollbar={{
                                    enabled: true,
                                    el: '.swiper-scrollbar',
                                    draggable: true,
                                    snapOnRelease: true,
                                    thresholdDelta: 200
                                }}
                            >
                                {
                                    imagesArr.map((item, index) => (
                                        <div key={index} className="wow animate__fadeIn" data-wow-delay={`1s`} >
                                            <SwiperSlide key={index} className="swiperSlide">
                                                <div className='spotDiv' style={item.link ? {cursor: 'pointer', backgroundImage: `url('${item.img}')`} : { backgroundImage: `url('${item.img}')`}} key={index}  onClick={()=>{
                                            if(item.link){
                                                navigate(item.link)
                                            }
                                        }}>
                                                    <div className='innerSpotDiv'>
                                                        <div>
                                                            <h3>{item.name} <span style={{fontSize: '14px'}}>({!item.link ? `Coming soon` : null})</span></h3>
                                                            <p>New Community Marketplace</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </SwiperSlide>


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
        </Fragment >
    );
}


export default SpotLight;

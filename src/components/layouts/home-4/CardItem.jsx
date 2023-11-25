import React, { useEffect } from 'react';
import img1 from '../../../assets/images/box-item/img_cart_item.jpg'
import img2 from '../../../assets/images/box-item/img_cart_item2.jpg'
import img3 from '../../../assets/images/box-item/img_cart_item3.jpg'
import img4 from '../../../assets/images/box-item/img_cart_item4.jpg'
import img5 from '../../../assets/images/box-item/img_cart_item5.jpg'
import img6 from '../../../assets/images/box-item/img_cart_item6.jpg'
import img7 from '../../../assets/images/box-item/img_cart_item7.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import SpotLight from './SpotLight';
const CardItem = (props) => {
    useEffect(() => {
        props.setSearch(true)
    }, [])
    return (
        <section className="flat-cart-item">
             
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="wrap-cart flex mainNFTSSec1">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation={true}
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
                                    1200: {
                                        slidesPerView: 4,
                                    },
                                    1300: {
                                        slidesPerView: 5,
                                    },
                                }}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}

                            >

                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img4} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img5} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart mg-bt-30">
                                            <div className="overlay"></div>
                                            <img src={img6} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img7} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img1} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates Hamlet Contemplates</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img2} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img4} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img5} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide >

                                    <div className="cart_item">
                                        <div className="inner-cart mg-bt-30">
                                            <div className="overlay"></div>
                                            <img src={img6} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                        <div className="inner-cart">
                                            <div className="overlay"></div>
                                            <img src={img7} alt="Axies" />
                                            <div className="content">
                                                <div className="fs-16"><a href="/item-details-01">"Hamlet Contemplates ...</a></div>
                                                <p>Graphic Art 3D</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>

                    </div>
                </div>
            </div>
            <SpotLight />

        </section>
    );
}

export default CardItem;

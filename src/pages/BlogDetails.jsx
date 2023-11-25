import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/box-item/icon1-recont-post.jpg'
import img2 from '../assets/images/box-item/icon2-recont-post.jpg'
import img3 from '../assets/images/box-item/icon3-recont-post.jpg'
import img4 from '../assets/images/box-item/icon4-recont-post.jpg'
import imgblog1 from '../assets/images/blog/thumb-7.jpg'
import imgblog2 from '../assets/images/blog/thumb-6.jpg'
import imgblogdetail1 from '../assets/images/blog/thumb1_details.jpg'
import imgblogdetail2 from '../assets/images/blog/thumb2_details.jpg'
import HeaderNew from '../components/header/HeaderNew';
import { ParticleComponent } from './ParticleComponent';
import { getSingleBlog } from '../module/action/Blogs';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './spinner';

const BlogDetails = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const singleBlog = useSelector(e => e.blog.singleBlog)
    const singleBlogLoader = useSelector(e => e.blog.singleBlogLoader)

    useEffect(() => {
        const url = new URL(window.location)
        const id = url.searchParams.get('id')
        dispatch(getSingleBlog(id))
    }, [])

    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');

        // console.log(scrollTop)
    };

    const [dataRecent] = useState(
        [
            {
                img: img1,
                title: '6 Make Mobile Website Faster',
                text: 'Lorem ipsum dolor sit amer....',
                time: 'August 10, 2021'
            },
            {
                img: img2,
                title: 'Experts Web Design Tips',
                text: 'Lorem ipsum dolor sit amer....',
                time: 'August 10, 2021'
            },
            {
                img: img3,
                title: 'Importance Of Web Design',
                text: 'Lorem ipsum dolor sit amer....',
                time: 'August 10, 2021'
            },
            {
                img: img4,
                title: 'Avoid These Erros In UI Design',
                text: 'Lorem ipsum dolor sit amer....',
                time: 'August 10, 2021'
            },

        ]
    )
    const [dataTags] = useState(
        [
            {
                name: 'Bitcoin'
            },
            {
                name: 'NFT'
            },
            {
                name: 'Bids'
            },
            {
                name: 'Digital'
            },
            {
                name: 'Arts'
            },
            {
                name: 'Marketplace'
            },
            {
                name: 'Token'
            },
            {
                name: 'Wallet'
            },
            {
                name: 'Crypto'
            },
        ]
    )

    const [blogObj, setBlogObj] = useState({})
    const [blogContent, setBlogContent] = useState("")

    useEffect(() => {
        if (singleBlog) {
            console.log(singleBlog)
            setBlogObj(singleBlog[0])
            document.getElementById('blogRef').innerHTML = singleBlog[0].blogData;
            setBlogContent(singleBlog[0].blogData)
        }
    }, [singleBlog])

    const dateFormat = (dateData) => {
        let month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        let newDate = new Date(dateData)
        let currMonth = month[newDate.getMonth()]
        let date = newDate.getDate()
        let year = newDate.getFullYear()

        return `${currMonth} ${date}, ${year}`

    }

    useEffect(() => {
        if (blogContent) {
            let allP = document.getElementById('blogRef').querySelectorAll('p')
            let allSpan = document.getElementById('blogRef').querySelectorAll('span')
            let allH = document.getElementById('blogRef').querySelectorAll('h1,h2,h3,h4,h5,h6')
            let allLi = document.getElementById('blogRef').querySelectorAll('li')

            if (allP.length) {

                allP.forEach((a, i) => {
                    a.classList.add('mg-bt-24')
                    // a.style.color = '#fff'
                })
            }
            if (allSpan.length) {

                allSpan.forEach((a, i) => {
                    a.classList.add('mg-bt-24')
                    // a.style.color = '#fff'
                })
            }
            if (allH.length) {

                allH.forEach((a, i) => {
                    a.classList.add('heading')
                    a.classList.add('mg-bt-16')
                    // a.style.color = '#fff'
                })
            }
            if (allLi.length) {

                allLi.forEach((a, i) => {
                    a.classList.add('mg-bt-24')
                    // a.style.color = '#fff'
                })
            }
        }
    }, [blogContent])



    return (
        <div className='blogDetailPage'>
            {/* <ParticleComponent /> */}

            <HeaderNew search={true} setSearch={false} />

            <section className="flat-title-page">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Blog Details</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tf-section post-details">
                <div className="tayson" />
                <div className="themesflat-container">
                    <div className="wrap-flex-box style">
                        <div className="post">
                            {singleBlogLoader ?
                                <div className='spinnerBlog'>
                                    <Spinner />
                                </div> :
                                <div className="inner-content">
                                    <h2 className="title-post">{blogObj.blogTitle}</h2>
                                    <div className="divider"></div>
                                    <div className="meta-post flex mg-bt-31">
                                        <div className="box">
                                            <div className="inner" style={{ display: 'none' }}>
                                                <h6 className="desc">DESIGNER INTERVIEW</h6>
                                                <p>AUGUST CHAPTER</p>
                                            </div>
                                        </div>
                                        <div className="box left">
                                            <div className="inner boder pad-r-50">
                                                <h6 className="desc">WRITER</h6>
                                                {blogObj && blogObj.user && blogObj.user.length ?
                                                    <p>{`${blogObj.user[0].first_Name} ${blogObj.user[0].last_Name}`}</p>
                                                    : null}
                                            </div>
                                            <div className="inner mg-l-39 mg-r-1">
                                                <h6 className="desc">DATE</h6>
                                                <p>{dateFormat(blogObj.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <img src={blogObj.blogImage} alt="Axies" />
                                    </div>
                                    <div className="inner-post mg-t-40" id="blogRef">

                                    </div>
                                    {/* <div className="inner-post mg-t-40">
                                    <h3 className="heading mg-bt-16">What is the most fun thing to become a designer?</h3>
                                    <p className="mg-bt-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Cupidatat non Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                    </p>
                                    <div className="image">
                                        <img src={imgblog2} alt="Axies" />
                                    </div>
                                
                                    <h3 className="heading mg-bt-16">How is your daily routine?</h3>
                                    <p className="mg-bt-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

                                    </p>
                                    <div className="image">
                                        <img src={imgblog2} alt="Axies" />
                                    </div>
                              
                                    <h3 className="heading mg-bt-16">Middle Post Heading</h3>
                                    <p>Middle Post Heading</p>
                                    <p> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                    <p className="mg-bt-22">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                </div> */}
                                    <div className="sc-widget style-1">
                                        <div className="widget widget-tag style-2">
                                            <h4 className="title-widget">Tags</h4>
                                            <ul>
                                                {/* {blogObj ? blogObj?.blogTags.length && blogObj?.blogTags.map((a, i) => (
                                                <li><Link to="#">{a}</Link></li>
                                            )) : null} */}
                                                <li><Link to="#">Token</Link></li>
                                                <li><Link to="#">Wallet</Link></li>
                                            </ul>
                                        </div>
                                        <div className="widget widget-social style-2">
                                            <h4 className="title-widget">Share:</h4>
                                            <ul>
                                                <li><Link to="#" className="icon-fl-facebook"></Link></li>
                                                <li className="style-2"><Link to="#" className="icon-fl-coolicon"></Link></li>
                                                <li className="mgr-none"><Link to="#" className="icon-fl-mess"></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="divider d2"></div>
                                    <div id="comments">
                                        <h3 className="heading mg-bt-23">
                                            Leave A Comment
                                        </h3>
                                        <form action="#" method="post" id="commentform" className="comment-form" >
                                            <fieldset className="name">
                                                <input type="text" id="name" placeholder="Name" className="tb-my-input" name="name" tabIndex="2" aria-required="true" required />
                                            </fieldset>
                                            <fieldset className="email">
                                                <input type="email" id="email" placeholder="Email *" className="tb-my-input" name="email" tabIndex="2" aria-required="true" required />
                                            </fieldset>
                                            <fieldset className="message">
                                                <textarea id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required />
                                            </fieldset>
                                            <div className="btn-submit mg-t-36">
                                                <button className="tf-button-submit" type="submit">
                                                    Send comment
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="side-bar details">
                            <div className="widget widget-recent-post mg-bt-43">
                                <h3 className="title-widget mg-bt-23">Recent Post</h3>
                                <ul>
                                    {
                                        dataRecent.map((item, index) => (
                                            <li key={index} className="box-recent-post">
                                                <div className="box-feature"><Link to="/blog-details"><img src={item.img} alt="Axies" /></Link></div>
                                                <div className="box-content">
                                                    <Link to="/blog-details" className="title-recent-post">{item.title}</Link>
                                                    <span><span className="sub-recent-post">{item.text}</span><Link to="/blog" className="day-recent-post">{item.time}</Link></span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="widget widget-tag style-1">
                                <h3 className="title-widget mg-bt-23">Popular Tag</h3>
                                <ul>
                                    {
                                        dataTags.map((item, index) => (
                                            <li key={index}><Link to="/blog" className="box-widget-tag">{item.name}</Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default BlogDetails;

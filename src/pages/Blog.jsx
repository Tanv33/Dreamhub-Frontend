import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogData from '../assets/fake-data/data-blog'
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import HeaderNew from '../components/header/HeaderNew';
import { ParticleComponent } from './ParticleComponent';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBlogs } from '../module/action/Blogs';
import imga1 from '../assets/images/avatar/avt-2.jpg';
import Spinner from './spinner';

const Blog = () => {

    const [visible, setVisible] = useState(6);
    const dispatch = useDispatch()
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    const [data, setData] = useState('');
    const blogData = useSelector(e => e.blog.blogData)
    const blogDataLoader = useSelector(e => e.blog.blogDataLoader)


    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');

        // console.log(scrollTop)
    };

    useEffect(() => {
        dispatch(GetAllBlogs())
    }, [])
    useEffect(() => {
        console.log(blogData)
        if (blogData) {
            let arr = blogData.map((a, i) => {
                return {

                    img: a.blogImage,
                    title: a.blogTitle,
                    imgAuthor: imga1,
                    nameAuthor: a.user[0].first_Name + " " + a.user[0].last_Name,
                    time: new Date(a.blogDate).toDateString(),
                    content: a.blogDescription,
                    id: a._id

                }
            })
            setData(arr)
        }
    }, [blogData])

    return (
        <div className='blogPage'>
            {/* <ParticleComponent /> */}

            <HeaderNew search={true} setSearch={false} />

            <section className="flat-title-page">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Blog</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tf-section sc-card-blog dark-style2">
                <div className="tayson" />
                <div className="themesflat-container">
                    {blogDataLoader ?
                        <div className='spinnerBlog'>
                            <Spinner />
                        </div>
                        :
                        <div className="row">
                            {
                                data && data.slice(0, visible).map((item, index) => (
                                    <BlogItem key={index} item={item} />
                                ))
                            }
                            {
                                visible < data.length &&
                                <div className="col-md-12 wrap-inner load-more text-center">
                                    <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3 mt-6" onClick={showMoreItems}><span>Load More</span></Link>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

const BlogItem = props => (
    <div className="fl-blog fl-item2 col-lg-4 col-md-6" onClick={() => console.log(props.item)}>
        <article className="sc-card-article">
            <div className="card-media">
                <Link to={`/blog-details?id=${props.item.id}`}><img src={props.item.img} alt="Axies" /></Link>
            </div>
            <div className="meta-info">
                <div className="author">
                    <div className="avatar">
                        <img src={props.item.imgAuthor} alt="Axies" />
                    </div>
                    <div className="info">
                        <span>Post owner</span>
                        <h6> <Link to="/author-02">{props.item.nameAuthor}</Link> </h6>
                    </div>
                </div>
                <div className="date">{props.item.time}</div>
            </div>
            <div className="text-article">
                <h3><Link to={`/blog-details?id=${props.item.id}`}>{props.item.title}</Link></h3>
                <p>{props.item.content}</p>
            </div>
            <Link to={`/blog-details?id=${props.item.id}`} className="sc-button articleButton fl-button pri-3"><span>Read More</span></Link>
        </article>
    </div>
)

export default Blog;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import HeaderNew from '../components/header/HeaderNew';
import { ParticleComponent } from './ParticleComponent';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../module/action/user-task';
import Spinner from './spinner';
import { useAlert } from 'react-alert';

const Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let alert = useAlert()
    const signInLoader = useSelector(e => e.User.signInLoader)
    const [data, setData] = useState({
        "email": "",
        "password": ""
    })
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

    const login = () => {
        dispatch(signIn(data, navigate, alert))
    }

    return (
        <div className='loginPage'>
            {/* <ParticleComponent /> */}
            <HeaderNew search={true} setSearch={false} />

            <section className="flat-title-page">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Login</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-login tf-section">
                <div className="tayson" />
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="tf-title-heading ct style-1">
                                {/* Login To NFTs */}
                            </h2>

                            {/* <div className="flat-form box-login-social">
                                <div className="box-title-login">
                                    <h5>Login with social</h5>
                                </div>
                                <ul>
                                    <li>
                                        <Link to="#" className="sc-button style-2 fl-button pri-3">
                                            <i className="icon-fl-google-2"></i>
                                            <span>Google</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="sc-button style-2 fl-button pri-3">
                                            <i className="icon-fl-facebook"></i>
                                            <span>Facebook</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="flat-form box-login-email">
                                <div className="box-title-login">
                                    <h5>login with email</h5>
                                </div>

                                <div className="form-inner">
                                    <form action="#" id="contactform">
                                        <input id="email" name="email" tabIndex="2" aria-required="true" type="email" placeholder="Your Email Address" required
                                            onChange={(ev) => {
                                                let obj = { ...data }
                                                obj.email = ev.target.value
                                                setData(obj)
                                            }} />
                                        <input id="password" name="password" tabIndex="2" aria-required="true" type="password" placeholder="Your Password" required
                                            onChange={(ev) => {
                                                let obj = { ...data }
                                                obj.password = ev.target.value
                                                setData(obj)
                                            }} />
                                        <div className="row-form style-1">
                                            <label>Remember me
                                                <input type="checkbox" />
                                                <span className="btn-checkbox"></span>
                                            </label>
                                            <Link to="#" className="forgot-pass">Forgot Password ?</Link>
                                        </div>

                                    </form>
                                    <button className="submit" onClick={() => {
                                        login()
                                    }} disabled={signInLoader}>
                                        {
                                            signInLoader ?
                                                <Spinner />
                                                :
                                                `Login`
                                        }
                                    </button>
                                    <p className='didAcc'>Didn't have an account? <span onClick={() => {
                                        navigate('/sign-up')
                                    }}>Sign Up</span></p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Login;

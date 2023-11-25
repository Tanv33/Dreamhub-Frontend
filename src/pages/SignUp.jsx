import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import HeaderNew from '../components/header/HeaderNew';
import { ParticleComponent } from './ParticleComponent';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './spinner';
import { signUp } from '../module/action/user-task';
import { useAlert } from 'react-alert';

const SignUp = () => {
    const signedUpLoader = useSelector(e => e.User.signedUpLoader)
    const user = useSelector((e) => e.wallet.user);
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let alert = useAlert()

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
    const [data, setData] = useState({
        "first_Name": "",
        "last_Name": "",
        "full_Name": "",
        "email": "",
        "password": "",
        "confirm_password": "",
        "type": "User"
    })

    const signUpFn = () => {
        dispatch(signUp(data, navigate, alert))
    }

    return (
        <div className='signUpPage'>
            {/* <ParticleComponent /> */}
            <HeaderNew search={true} setSearch={false} />

            <section className="flat-title-page">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Signup</h1>
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
                                    <h5>signup with email</h5>
                                </div>

                                <div className="form-inner">
                                    <form action="#" id="contactform" onSubmit={(ev) => {

                                        ev.preventDefault()
                                        signUpFn(navigate)

                                    }}>
                                        <div className='nameDiv'>
                                            <input id="first_Name" name="first_Name" tabIndex="1" aria-required="true" required type="text" placeholder="Your First Name" onChange={(ev) => {
                                                let obj = { ...data }
                                                obj.first_Name = ev.target.value
                                                setData(obj)
                                            }} />
                                            <input id="last_Name" name="last_Name" tabIndex="1" aria-required="true" required type="text" placeholder="Your Last Name" onChange={(ev) => {
                                                let obj = { ...data }
                                                obj.last_Name = ev.target.value
                                                setData(obj)
                                            }} />
                                        </div>
                                        <input id="fullName" name="fullName" tabIndex="2" aria-required="true" required type="text" placeholder="Your Full Name" onChange={(ev) => {
                                            let obj = { ...data }
                                            obj.full_Name = ev.target.value
                                            setData(obj)
                                        }} />
                                        <input id="email" name="email" tabIndex="3" aria-required="true" type="email" placeholder="Your Email Address" required onChange={(ev) => {
                                            let obj = { ...data }
                                            obj.email = ev.target.value
                                            setData(obj)
                                        }} />
                                        <input id="pass" name="pass" tabIndex="4" aria-required="true" type="password" placeholder="Set Your Password" required onChange={(ev) => {
                                            let obj = { ...data }
                                            obj.password = ev.target.value
                                            setData(obj)
                                        }} />
                                        <input id="confirmPass" name="confirmPass" tabIndex="5" aria-required="true" type="password" placeholder="Confirm Your Password" required onChange={(ev) => {
                                            let obj = { ...data }
                                            obj.confirm_password = ev.target.value
                                            setData(obj)
                                        }} />


                                        <button className="submit" type='submit' disabled={signedUpLoader}>{
                                            signedUpLoader ?
                                                <Spinner />
                                                :
                                                `Sign Up`
                                        }</button>
                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section >
            <Footer />
        </div >
    );
}

export default SignUp;

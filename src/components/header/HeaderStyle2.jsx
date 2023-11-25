import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from "./DarkMode";
import logodark from "../../assets/images/logo/logodream.svg";
import avt from "../../assets/images/avatar/avt-2.png";
import coin from "../../assets/images/logo/coin.svg";
import store from "../../store";
import { logout } from "../../module/action/wallet";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
// import { ContractHelper } from "../../assets/web3/contractHelper";
import { useWeb3Context } from "web3-react";

const HeaderStyle2 = (props) => {
  // moved this liones to use effect
  // const web3 = new Web3(Web3.givenProvider);
  let navigate = useNavigate();
  const { networkId } = useWeb3Context();
  const { pathname } = useLocation();
  const wallet = useSelector((e) => e.wallet);

  const headerRef = useRef(null);
  // console.log(wallet, "wallet");
  const [balance, setBalance] = useState("");
  useEffect(async () => {
    if (wallet?.connectedWallet) {
      // const web3Provider = await ContractHelper(networkId);
      // const web3 = new Web3(web3Provider.givenProvider || Web3.givenProvider);
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.getBalance(wallet?.connectedWallet, function (err, result) {
        if (err) {
          console.log("error in getting balance=>", err);
        } else {
          // console.log(web3.utils.fromWei(result, "ether") + " ETH");
          setBalance(web3.utils.fromWei(result, "ether"));
        }
      });
    }
  }, [wallet?.connectedWallet]);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("is-fixed")
      : header.classList.remove("is-fixed");
    scrollTop >= 400
      ? header.classList.add("is-small")
      : header.classList.remove("is-small");
  };

  const menuLeft = useRef(null);
  const btnToggle = useRef(null);
  const btnSearch = useRef(null);

  const menuToggle = () => {
    menuLeft.current.classList.toggle("active");
    btnToggle.current.classList.toggle("active");
  };

  const searchBtn = () => {
    btnSearch.current.classList.toggle("active");
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (opacity) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }, 600);
  }, [opacity]);

  return (
    <header
      id="header_main"
      className="header_1 header_2 style2 js-header"
      ref={headerRef}
    >
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link to="/" rel="home" className="main-logo">
                      <img id="logo_header" src={logodark} alt="nft-gaming" />
                    </Link>
                  </div>
                </div>

                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, index) => (
                      <li
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={`menu-item ${
                          data.namesub ? "menu-item-has-children" : ""
                        } ${activeIndex === index ? "active" : ""} `}
                      >
                        <Link to={data.links}>{data.name}</Link>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub.map((submenu) => (
                              <li
                                key={submenu.id}
                                className={
                                  pathname === submenu.links
                                    ? "menu-item current-item"
                                    : "menu-item"
                                }
                              >
                                <Link to={submenu.links}>{submenu.sub}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}

                    <li className={`menu-item hidePc`}>
                      <Link to="/create-item">Create</Link>
                    </li>
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  <div className="header-search flat-show-search" id="s1">
                    <Link
                      to="#"
                      className="show-search header-search-trigger"
                      onClick={searchBtn}
                    >
                      <i className="far fa-search"></i>
                    </Link>
                    <div className="top-search" ref={btnSearch}>
                      <form
                        action="#"
                        method="get"
                        role="search"
                        className="search-form"
                      >
                        <input
                          type="search"
                          id="s"
                          className="search-field"
                          placeholder="Search..."
                          name="s"
                          title="Search for"
                          required=""
                        />
                        <div className="closebrowser">
                          <Link
                            to="#"
                            className="search search-submit-close"
                            onClick={searchBtn}
                          >
                            <i className="fas fa-times"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  {wallet?.user?._id ? (
                    <>
                      <div
                        className="sc-btn-top mg-r-12 hideMob"
                        id="site-header"
                      >
                        <Link to="/create-item" className="sc-button">
                          <span>Create</span>
                        </Link>
                      </div>
                      {/*
                      <div className="sc-btn-top mg-r-12" id="site-header">
                        <Link
                          to={`/authors-02/auther?id=${wallet?.user?._id}`}
                          className="sc-button"
                        >
                          <span>Profile</span>
                        </Link>
                      </div>
                      <div
                        className="sc-btn-top mg-r-12"
                        id="site-header"
                        onClick={() => props.logout(navigate)}
                      >
                        <Link to="/" className="sc-button">
                          <span>Logout</span>
                        </Link>
                      </div> */}
                      <div className="admin_active" id="header_admin">
                        <div className="header_avatar">
                          <div
                            className="headerAvatarDiv"
                            onClick={() => {
                              setOpacity(opacity ? 0 : 1);
                            }}
                          >
                            <div className="price">
                              <span>
                                {balance.slice(0, 6)} <strong>ETH</strong>{" "}
                              </span>
                            </div>
                            <img className="avatar" src={avt} alt="avatar" />
                          </div>
                          <div
                            className="avatar_popup mt-20"
                            style={{ opacity: opacity, display: display }}
                          >
                            <div className="d-flex align-items-center copy-text justify-content-between">
                              {/* <span>{`${wallet?.connectedWallet.slice(0, 6)}....${wallet?.connectedWallet.slice(props.connectedWallet.length - 3)}`} </span> */}
                              <span>
                                {`${wallet?.connectedWallet.slice(
                                  0,
                                  6
                                )}...${wallet?.connectedWallet.slice(
                                  wallet?.connectedWallet.length - 3
                                )}`}{" "}
                              </span>
                              <Link to="/" className="ml-2">
                                <i className="fal fa-copy"></i>
                              </Link>
                            </div>
                            <div className="d-flex align-items-center mt-10">
                              <div className="info ml-10">
                                <p className="text-sm font-book text-gray-400">
                                  Balance
                                </p>
                                <p className="w-full text-sm font-bold text-green-500">
                                  {balance.slice(0, 6)} ETH
                                </p>
                              </div>
                            </div>
                            <div className="hr"></div>
                            <div className="links mt-20">
                              <Link
                                to={`/authors-02/auther?id=${wallet?.user?._id}`}
                              >
                                <i className="fab fa-accusoft"></i>{" "}
                                <span> My items</span>
                              </Link>
                              <Link className="mt-10" to="/edit-profile">
                                <i className="fas fa-pencil-alt"></i>{" "}
                                <span> Edit Profile</span>
                              </Link>
                              <div
                                className="mt-10"
                                id="logout"
                                onClick={() => {
                                  props.logout(navigate);
                                }}
                              >
                                <p>
                                  <i className="fal fa-sign-out"></i>{" "}
                                  <span> Logout</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link to="/wallet-connect" className="sc-button">
                        <span>Sign in</span>
                      </Link>
                    </div>
                  )}
                  <div
                    className="mobile-button"
                    ref={btnToggle}
                    onClick={menuToggle}
                    onRequestClose={menuToggle}
                  >
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </header>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStyle2);

import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from "./DarkMode";
import logoheader from "../../assets/images/logo/logo.png";
import logoheader2x from "../../assets/images/logo/logo@2x.png";
import logodark from "../../assets/images/logo/logodream.svg";
import logoLight from "../../assets/images/logo/black-vertical-logo.svg";
import logodark2x from "../../assets/images/logo/logo_dark@2x.png";
import imgsun from "../../assets/images/icon/sun.png";
import avt from "../../assets/profileIcon.webp";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useWeb3Context } from "web3-react";
import { ContractHelper } from "../../module/action/contractHelper";
import Web3 from "web3";
import { getWalletBalance, logout } from "../../module/action/wallet";
import User from "../../module/store/User";
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { getSignedInUser } from "../../module/action/user-task";
import { MP_ADDRESS, NFT_ADDRESS } from "../../assets/web3/addresses";
import NFT_ABI from "../../assets/web3/NFT_ABI.js";
import { ethers } from "ethers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import metamask from "../../assets/images/MetaMask.png";
import fantomIcon from "../../assets/diamondORG.png";
const Header = (props) => {
  const { pathname } = useLocation();
  let dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  const headerRef = useRef(null);
  const notUsed = useRef();
  const [user, setUser] = useState({});

  let navigate = useNavigate();
  const { networkId } = useWeb3Context();
  const wallet = useSelector((e) => e.wallet);

  const [balance, setBalance] = useState(0);
  useEffect(async () => {
    // if (wallet?.accountBalance) {
    if (wallet.accountBalance) {
      setBalance(wallet.accountBalance);
    }

    // }
  }, [wallet?.accountBalance]);

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerAnim, setDrawerAnim] = useState("0px");
  const [drawerDisplay, setDrawerDisplay] = useState("none");
  const [drawerOpacity, setDrawerOpacity] = useState(0);
  const [drawerScale, setDrawerScale] = useState(0);

  const [drawerOpenUser, setDrawerOpenUser] = useState(false);

  const [drawerAnimUser, setDrawerAnimUser] = useState("0px");
  const [drawerDisplayUser, setDrawerDisplayUser] = useState("none");
  const [drawerOpacityUser, setDrawerOpacityUser] = useState(0);
  const [drawerScaleUser, setDrawerScaleUser] = useState(0);
  const theme = useSelector((e) => e.themeStore.theme);

  const [searchDropDown, setSearchDropDown] = useState(false);
  const searchInput = useRef();
  useEffect(() => {
    window.addEventListener("keyup", (ev) => {
      if (ev.keyCode === 70) {
        var activeElement = document.activeElement;
        var inputs = ["input", "select", "textarea"];

        if (
          activeElement &&
          inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1
        ) {
          return;
        } else {
          // console.log(false)
          setSearchDropDown(true);
          searchInput.current.focus();
        }
      }
      if (ev.keyCode === 27) {
        setSearchDropDown(false);
        searchInput.current.blur();
      }
    });
  }, []);

  useEffect(() => {
    if (drawerOpenUser) {
      setDrawerDisplayUser("block");
      setTimeout(() => {
        setDrawerAnimUser("24px");
        setDrawerOpacityUser(1);
        // setDrawerScale(1)
      }, 200);
    } else {
      setDrawerAnimUser("0px");
      setDrawerOpacityUser(0);
      // setDrawerScale(0)
      setTimeout(() => {
        setDrawerDisplayUser("none");
      }, 400);
    }
  }, [drawerOpenUser]);

  useEffect(() => {
    if (drawerOpen) {
      setDrawerDisplay("block");
      setTimeout(() => {
        setDrawerAnim("24px");
        setDrawerOpacity(1);
        // setDrawerScale(1)
      }, 200);
    } else {
      setDrawerAnim("0px");
      setDrawerOpacity(0);
      // setDrawerScale(0)
      setTimeout(() => {
        setDrawerDisplay("none");
      }, 400);
    }
  }, [drawerOpen]);

  useEffect(() => {
    // if (props.signedInUser) {
    setUser(wallet?.user);
    // console.log(wallet?.user, 'signedInUser');
    // }
  }, [wallet?.user]);

  useEffect(() => {
    if (wallet?.connectedWallet) {
      dispatch(getWalletBalance(wallet?.connectedWallet));
    }
  }, [wallet?.connectedWallet]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <>
      <header
        id="header_main"
        className="header_1 newHeader js-header"
        ref={headerRef}
      >
        <div className="innerHeader">
          <div className="menu">
            <div className="headerLogo">
              <Link to="/" rel="home" className="main-logo">
                {theme == "is_dark" ? (
                  <img id="logo_header" src={logodark} alt="nft-gaming" />
                ) : props.search ? (
                  <img id="logo_header" src={logodark} alt="nft-gaming" />
                ) : (
                  <img id="logo_header" src={logoLight} alt="nft-gaming" />
                )}
              </Link>
            </div>
            {props.search ? (
              <div
                className="inputSearch "
                onBlur={() => setSearchDropDown(false)}
              >
                <input
                  onFocus={() => setSearchDropDown(true)}
                  placeholder="Search by collection, NFT, or user"
                  ref={searchInput}
                />
                {/* <input placeholder='Search by collection, NFT, or user' /> */}
                <div className="buttonSearch">
                  <div className="button">{searchDropDown ? "esc" : "F"}</div>
                </div>
                <div
                  className="searchDropDown"
                  // onBlur={() => console.log(false)}
                  style={
                    searchDropDown
                      ? { transform: "scale(1)", opacity: "1" }
                      : { transform: "scale(0)", opacity: "0" }
                  }
                >
                  <p>Popular</p>
                  <div className="searchTags">
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                    <div className="searchTagsDiv">BAYC</div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="connectButton">
              {wallet?.user ? (
                <>
                  <div className="admin_active" id="header_admin">
                    <div className="header_avatar">
                      <div
                        className="headerAvatarDiv"
                        onClick={() => {
                          // setOpacity(opacity ? 0 : 1);
                          // setDrawerScale(drawerScale ? 0 : 1);
                          setDrawerOpenUser(!drawerOpenUser);
                        }}
                      >
                        {/* <div className="price">
                          <span>
                            {Number(balance).toFixed(4)} <strong>ETH</strong>{" "}
                          </span>
                        </div> */}
                        {/* <img
                          className="avatar"
                          src={user?.profile_img ? `${user?.profile_img}` : avt}
                          alt="avatar"
                        /> */}
                        <img
                          className="avatar"
                          src={user?.profile_img ? user?.profile_img : avt}
                          alt="avatar"
                        />
                      </div>
                      <div
                        className="avatar_popup mt-20"
                        // style={{ opacity: 1, display: 'block' }}
                        style={{
                          opacity: opacity,
                          display: display,
                          transform: `scale(${drawerScale})`,
                        }}
                      >
                        <div>
                          <p className="nameAvatar">{user.full_Name}</p>
                        </div>
                        <div className="avBalance">
                          <h5>Balance</h5>
                          <p>{Number(balance).toFixed(4)} ETH</p>
                        </div>
                        <div className="avWallet">
                          <h5>My Wallet</h5>
                          <div className="walletAddressDiv">
                            <p className="walletAddresspopUp">
                              {wallet?.connectedWallet}
                            </p>
                            <button>Copy</button>
                          </div>
                        </div>
                        <hr className="hrLine" />
                        <ul className="de-submenu-profile">
                          <li>
                            <span
                              onClick={() =>
                                (window.location.href = `/authors-02/auther?id=${wallet?.user?._id}`)
                              }
                            >
                              <i className="fa fa-user"></i>
                              My profile
                            </span>
                          </li>
                          <li>
                            <span onClick={() => navigate("/edit-profile")}>
                              <i className="fa fa-pencil"></i>
                              Edit profile
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => {
                                props.logout(
                                  navigate,
                                  props.setSearch,
                                  wallet.connector
                                );
                              }}
                            >
                              <i className="fa fa-sign-out"></i>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="headerAvatarDiv logSingNav"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login / SignUp
                  </div>
                </>
              )}
              {wallet?.connectedWallet ? null : (
                <Link to="/wallet-connect">
                  <button className="walletButton">Connect Wallet</button>
                </Link>
              )}
              <button
                className="moreItem"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <DarkMode />
        </div>
      </header>
      {/* {drawerOpen ?
                <> */}

      {/* </> */}
      {/* // : null} */}
      <div
        className="drawerDiv"
        style={{ display: drawerDisplayUser, opacity: drawerOpacityUser }}
        onClick={() => {
          setDrawerOpen(false);
          setDrawerOpenUser(false);
          setCopied(false);
        }}
      ></div>
      {/* userDrawer */}
      <div
        className={`Drawer ${drawerOpenUser ? "shown" : "notShown"}`}
        style={{
          right: drawerAnimUser,
          opacity: drawerOpacityUser,
          display: drawerDisplayUser,
        }}
      >
        <div className="innerDrawer">
          <div className="drawerLinkDiv">
            <div>
              <div className="userLink">
                {/* <img
                  className="avatar"
                  src={
                    user?.profile_img
                      ? `${BASE_URL}/api/v1/user/nft/nft-view-image/${user?.profile_img}`
                      : avt
                  }
                  alt="avatar"
                /> */}
                <img
                  className="avatar"
                  src={user?.profile_img ? user?.profile_img : avt}
                  alt="avatar"
                />
                <p className="nameAvatar">{user.full_Name}</p>
              </div>

              <div className="mainLinkDiv">
                <div className="mainLink">
                  <h5
                    onClick={() =>
                      (window.location.href = `/authors-02/auther?id=${wallet?.user?._id}`)
                    }
                  >
                    My profile
                  </h5>
                </div>
                {wallet?.user?._id ? (
                  <div className="mainLink">
                    <h5 onClick={() => navigate("/edit-profile")}>
                      Edit profile
                    </h5>
                  </div>
                ) : null}
                <div className="mainLink">
                  <h5
                    onClick={() => {
                      props.logout(navigate, props.setSearch, wallet.connector);
                    }}
                  >
                    Sign out
                  </h5>
                </div>
              </div>
            </div>
            <div>
              {wallet.connectedWallet ? (
                <>
                  <div className="connDrawer">
                    <p>Connected wallet</p>
                    <p>Manage Wallets</p>
                  </div>
                  <div className="wallet">
                    <div className="walletDetails">
                      <div className="innerWalletDetails">
                        <div className="walletDetailsImg">
                          <img src={metamask} />
                        </div>
                        <div className="walletDetailsText">
                          <p>FANTOM</p>
                          <h4>
                            {wallet.connectedWallet.slice(0, 5) +
                              "...." +
                              wallet.connectedWallet.slice(6, 10)}
                          </h4>
                        </div>
                      </div>
                      <div className="walletDetailsButton">
                        <OverlayTrigger
                          placement={"top"}
                          // show={'show'}
                          overlay={
                            <Tooltip id={`tooltip-top`} className="toolTipDiv">
                              Copy
                            </Tooltip>
                          }
                        >
                          <div
                            className="wallDetBut"
                            title="copy"
                            onClick={() => {
                              setCopied(true);
                              navigator.clipboard.writeText(
                                wallet.connectedWallet
                              );
                            }}
                          >
                            <svg
                              viewBox="0 0 25 24"
                              fill="none"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                              className="sc-bdvvtL sc-iCfMLu iWfNDX"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.9834 5.25C7.91233 5.25 6.2334 6.92893 6.2334 9V12C6.2334 13.8363 7.55334 15.3644 9.29622 15.6872C9.61899 17.4301 11.1471 18.75 12.9834 18.75H15.9834C18.0545 18.75 19.7334 17.0711 19.7334 15V12C19.7334 10.1637 18.4135 8.63559 16.6706 8.31282C16.3478 6.56994 14.8197 5.25 12.9834 5.25H9.9834ZM15.1054 8.25C14.7965 7.37611 13.9631 6.75 12.9834 6.75H9.9834C8.74076 6.75 7.7334 7.75736 7.7334 9V12C7.7334 12.9797 8.3595 13.8131 9.2334 14.122V12C9.2334 9.92893 10.9123 8.25 12.9834 8.25H15.1054ZM10.7334 12C10.7334 10.7574 11.7408 9.75 12.9834 9.75H15.9834C17.226 9.75 18.2334 10.7574 18.2334 12V15C18.2334 16.2426 17.226 17.25 15.9834 17.25H12.9834C11.7408 17.25 10.7334 16.2426 10.7334 15V12Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement={"top"}
                          // show={'show'}
                          overlay={
                            <Tooltip id={`tooltip-top`} className="toolTipDiv">
                              Disconnect
                            </Tooltip>
                          }
                        >
                          <div
                            className="wallDetBut"
                            onClick={() => {
                              props.logout(
                                navigate,
                                props.setSearch,
                                wallet.connector
                              );
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                              className="sc-bdvvtL sc-iCfMLu iWfNDX"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V11C11.25 11.4142 11.5858 11.75 12 11.75C12.4142 11.75 12.75 11.4142 12.75 11V6ZM8.3182 9.54302C8.6181 9.2573 8.6296 8.78257 8.34389 8.48267C8.05817 8.18277 7.58344 8.17127 7.28354 8.45698C6.03229 9.64905 5.25 11.3176 5.25 13.1667C5.25 16.8223 8.29213 19.75 12 19.75C15.7079 19.75 18.75 16.8223 18.75 13.1667C18.75 11.3176 17.9677 9.64905 16.7165 8.45698C16.4166 8.17127 15.9418 8.18277 15.6561 8.48267C15.3704 8.78257 15.3819 9.2573 15.6818 9.54302C16.6532 10.4685 17.25 11.7513 17.25 13.1667C17.25 15.9543 14.9196 18.25 12 18.25C9.08045 18.25 6.75 15.9543 6.75 13.1667C6.75 11.7513 7.3468 10.4685 8.3182 9.54302Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="currencyWallDet">
                      <div className="currencyWallDetDiv">
                        <img src={fantomIcon} />
                        <p>{Number(balance).toFixed(4)} ETH</p>
                      </div>
                    </div>
                    <div className="adSwapButton">
                      <button>SWAP ETH</button>
                      <button>Add ETH</button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {/* <div className="accountNumberDraw">
                <p className="accountNumberHeading" ><b>Account Number:</b> <span title="copy" className={`iconCopy ${copied ? `copied` : ''}`} onClick={() => { setCopied(true); navigator.clipboard.writeText(wallet.connectedWallet); }}>
                  {copied ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                  }
                </span></p>
                <p>
                  {wallet.connectedWallet ? wallet.connectedWallet : `not connected`}
                </p>

              </div>
              <div className="accountNumberDraw">
                <p className="accountNumberHeading"><b>Balance:</b></p>
                <p>
                  {Number(balance).toFixed(4)}
                </p>

              </div> */}
          </div>
        </div>
      </div>
      <div
        className="drawerDiv"
        style={{ display: drawerDisplay, opacity: drawerOpacity }}
        onClick={() => {
          setDrawerOpen(false);
          setDrawerOpenUser(false);
        }}
      ></div>
      {/* navbarDrawers */}
      <div
        className={`Drawer mainDrawer ${drawerOpen ? "shown" : "notShown"}`}
        style={{
          right: drawerAnim,
          opacity: drawerOpacity,
          display: drawerDisplay,
        }}
      >
        <div className="innerDrawer">
          <div className="drawerLinkDiv">
            <div className="mainLinkDiv">
              <div className="mainLink">
                <h5 onClick={() => navigate("/")}>Home</h5>
                <div className="closeOrSwitch">
                  <DarkMode />

                  <button onClick={() => setDrawerOpen(!drawerOpen)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu iWfNDX"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5303 7.53033C17.8232 7.23744 17.8232 6.76256 17.5303 6.46967C17.2374 6.17678 16.7626 6.17678 16.4697 6.46967L12 10.9393L7.53033 6.46967C7.23744 6.17678 6.76256 6.17678 6.46967 6.46967C6.17678 6.76256 6.17678 7.23744 6.46967 7.53033L10.9393 12L6.46967 16.4697C6.17678 16.7626 6.17678 17.2374 6.46967 17.5303C6.76256 17.8232 7.23744 17.8232 7.53033 17.5303L12 13.0607L16.4697 17.5303C16.7626 17.8232 17.2374 17.8232 17.5303 17.5303C17.8232 17.2374 17.8232 16.7626 17.5303 16.4697L13.0607 12L17.5303 7.53033Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              {wallet?.walletType ? (
                <div className="mainLink">
                  <h5 onClick={() => navigate("/create-item")}>Create</h5>
                </div>
              ) : null}
              <div className="mainLink">
                <h5 onClick={() => navigate("/explore-04")}>Explore</h5>
              </div>
              {/* <div className="mainLink">
                <h5 onClick={() => navigate("/live-auctions")}>Mints</h5>
              </div> */}
              <div className="mainLink">
                <h5 onClick={() => navigate("/activity-01")}>Activity</h5>
              </div>
              <div className="mainLink">
                <h5 onClick={() => navigate("/blog")}>Blog</h5>
              </div>
              <div className="walletButtonMobile">
                <Link to="/wallet-connect">
                  <button className="walletButton">Connect Wallet</button>
                </Link>

                <div
                  className="loginSignUpDrawer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login / SignUp
                </div>
              </div>
            </div>

            <div className="subLink">AGOD Token</div>
            <div className="subLink">Help center</div>
          </div>
          <div className="appSocialDiv">
            <div>
              <p>
                <span>Download DreamHub app</span> to track your NFT portfolio
                and discover drops
              </p>
              <div className="appButtonDiv">
                <OverlayTrigger
                  placement={"top"}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Coming Soon.
                    </Tooltip>
                  }
                >
                  <button className="storeButton">
                    {/* <div className="comingSoonToolTip">
                    Coming Soon
                  </div> */}
                    <svg
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu gBfQOf sc-kLwhqv gPNsDh"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.8683 2C11.9261 2.75473 11.6874 3.50226 11.203 4.08385C10.971 4.37239 10.6765 4.60453 10.3418 4.76278C10.0071 4.92103 9.64087 5.00128 9.27065 4.99746C9.24703 4.63452 9.29518 4.27049 9.41233 3.92616C9.52949 3.58184 9.71336 3.26398 9.95343 2.99076C10.4444 2.43149 11.1281 2.07774 11.8683 2ZM13.2185 7.49319C12.9726 7.92657 12.8402 8.41513 12.8338 8.91341C12.8344 9.47391 13 10.0218 13.3099 10.4888C13.6198 10.9559 14.0603 11.3213 14.5765 11.5397C14.3736 12.199 14.0676 12.8221 13.6701 13.3858C13.1361 14.1845 12.5763 14.9649 11.6878 14.9793C11.2652 14.989 10.9799 14.8675 10.6827 14.7409C10.3726 14.6088 10.0495 14.4712 9.54398 14.4712C9.0078 14.4712 8.67025 14.6132 8.3447 14.7503C8.06336 14.8687 7.79099 14.9833 7.40713 14.9992C6.56093 15.0305 5.91423 14.1467 5.36088 13.3555C4.2549 11.7397 3.3937 8.80192 4.54827 6.80296C4.8148 6.32401 5.20086 5.92226 5.66882 5.63687C6.13679 5.35147 6.6707 5.19216 7.21854 5.17446C7.69846 5.16459 8.15899 5.34957 8.56274 5.51174C8.87152 5.63577 9.1471 5.74646 9.37276 5.74646C9.57113 5.74646 9.83901 5.64014 10.1512 5.51623C10.643 5.32105 11.2447 5.08223 11.8579 5.14659C12.3279 5.16129 12.7879 5.28537 13.2016 5.50898C13.6152 5.73258 13.9709 6.04954 14.2406 6.4347C13.8161 6.69568 13.4645 7.05981 13.2185 7.49319Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    App Store
                  </button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"top"}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Coming Soon.
                    </Tooltip>
                  }
                >
                  <button className="storeButton">
                    <svg
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu gBfQOf sc-kLwhqv gPNsDh"
                    >
                      <path
                        d="M5.5633 3.18986C5.41178 3.37152 5.33447 3.60504 5.34719 3.84261V14.156C5.33155 14.394 5.40922 14.6286 5.5633 14.8088L5.59549 14.8461L11.2925 9.06925V8.92937L5.59549 3.15723L5.5633 3.18986Z"
                        fill="url(#paint0_linear_1745_83314)"
                      ></path>
                      <path
                        d="M13.1777 10.995L11.2925 9.06938V8.92951L13.1777 7.00391L13.2191 7.03188L15.4767 8.32805C16.1204 8.69639 16.1204 9.30251 15.4767 9.67551L13.2283 10.9717L13.1777 10.995Z"
                        fill="url(#paint1_linear_1745_83314)"
                      ></path>
                      <path
                        d="M13.233 10.9666L11.2927 8.99902L5.56348 14.8085C5.69341 14.9257 5.85971 14.9932 6.03356 14.9992C6.20741 15.0051 6.37783 14.9492 6.51527 14.8411L13.233 10.9666Z"
                        fill="url(#paint2_linear_1745_83314)"
                      ></path>
                      <path
                        d="M13.233 7.03194L6.51527 3.16209C6.37872 3.05248 6.20843 2.9952 6.03435 3.00032C5.86027 3.00543 5.69354 3.07262 5.56348 3.19006L11.2927 8.99951L13.233 7.03194Z"
                        fill="url(#paint3_linear_1745_83314)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_1745_83314"
                          x1="10.7867"
                          y1="3.73537"
                          x2="2.96381"
                          y2="11.4502"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#00A0FF"></stop>
                          <stop offset="0.01" stopColor="#00A1FF"></stop>
                          <stop offset="0.26" stopColor="#00BEFF"></stop>
                          <stop offset="0.51" stopColor="#00D2FF"></stop>
                          <stop offset="0.76" stopColor="#00DFFF"></stop>
                          <stop offset="1" stopColor="#00E3FF"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_1745_83314"
                          x1="16.3181"
                          y1="8.99945"
                          x2="5.19546"
                          y2="8.99945"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFE000"></stop>
                          <stop offset="0.41" stopColor="#FFBD00"></stop>
                          <stop offset="0.78" stopColor="#FFA500"></stop>
                          <stop offset="1" stopColor="#FF9C00"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_1745_83314"
                          x1="12.1801"
                          y1="10.0714"
                          x2="1.56937"
                          y2="20.5309"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF3A44"></stop>
                          <stop offset="1" stopColor="#C31162"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_1745_83314"
                          x1="4.11969"
                          y1="-0.241518"
                          x2="8.8563"
                          y2="4.42965"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#32A071"></stop>
                          <stop offset="0.07" stopColor="#2DA771"></stop>
                          <stop offset="0.48" stopColor="#15CF74"></stop>
                          <stop offset="0.8" stopColor="#06E775"></stop>
                          <stop offset="1" stopColor="#00F076"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    Google Play
                  </button>
                </OverlayTrigger>
              </div>
              <div className="appSocialDivider"></div>

              <div className="SocialLinksDrawer">
                <OverlayTrigger
                  placement={"top"}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Twitter
                    </Tooltip>
                  }
                >
                  <a
                    href="https://twitter.com/Dreamhubart"
                    target="_blank"
                    id="link-twitter"
                    title="Twitter"
                    className="sc-bdvvtL sc-iUKqMP sc-iAKWXU coxBnO iMgzEo sc-fHeRUh fVArpE"
                  >
                    <svg
                      viewBox="0 0 16 12"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu coxBnO"
                    >
                      <path
                        d="M13.7247 2.99772C13.7345 3.12897 13.7345 3.25947 13.7345 3.38997C13.7345 7.38372 10.6948 11.9857 5.1395 11.9857C3.428 11.9857 1.838 11.49 0.5 10.629C0.743 10.6567 0.977 10.6665 1.22975 10.6665C2.642 10.6665 3.94175 10.1895 4.9805 9.37572C3.65225 9.34797 2.53925 8.47797 2.15525 7.28097C2.342 7.30872 2.5295 7.32747 2.726 7.32747C2.99675 7.32747 3.269 7.28997 3.52175 7.22472C2.1365 6.94422 1.09925 5.72847 1.09925 4.25997V4.22247C1.502 4.44672 1.96925 4.58697 2.46425 4.60572C1.6505 4.06422 1.11725 3.13797 1.11725 2.09022C1.11725 1.52922 1.2665 1.01472 1.52825 0.566221C3.0155 2.39847 5.25125 3.59622 7.75775 3.72747C7.71125 3.50247 7.68275 3.26922 7.68275 3.03522C7.68275 1.37022 9.02975 0.0142212 10.7037 0.0142212C11.5737 0.0142212 12.359 0.378721 12.911 0.968221C13.5935 0.836971 14.2475 0.584221 14.828 0.238471C14.6038 0.939721 14.126 1.52922 13.4998 1.90347C14.108 1.83747 14.6975 1.66947 15.239 1.43547C14.828 2.03397 14.3142 2.56722 13.7247 2.99772Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"top"}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Instagram
                    </Tooltip>
                  }
                >
                  <a
                    href="https://www.instagram.com/dreamhubart/"
                    target="_blank"
                    id="link-instagram"
                    title="Instagram"
                    className="sc-bdvvtL sc-iUKqMP sc-iAKWXU coxBnO iMgzEo sc-fHeRUh fVArpE"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu coxBnO"
                    >
                      <path
                        d="M6.99921 3.53272C5.08371 3.53272 3.53196 5.08522 3.53196 6.99997C3.53196 8.91547 5.08371 10.468 6.99921 10.468C8.91321 10.468 10.4665 8.91547 10.4665 6.99997C10.4665 5.08522 8.91321 3.53272 6.99921 3.53272ZM6.99921 9.25297C5.75496 9.25297 4.74621 8.24422 4.74621 7.00072C4.74621 5.75647 5.75496 4.74847 6.99921 4.74847C8.24346 4.74847 9.25072 5.75647 9.25072 7.00072C9.25072 8.24422 8.24346 9.25297 6.99921 9.25297Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M10.6045 4.21372C11.051 4.21372 11.413 3.85175 11.413 3.40522C11.413 2.9587 11.051 2.59672 10.6045 2.59672C10.1579 2.59672 9.79597 2.9587 9.79597 3.40522C9.79597 3.85175 10.1579 4.21372 10.6045 4.21372Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M13.3997 2.58322C13.048 1.67647 12.3317 0.959473 11.425 0.609223C10.9007 0.411973 10.3465 0.306223 9.78547 0.294223C9.06321 0.262723 8.83447 0.253723 7.00296 0.253723C5.17146 0.253723 4.93671 0.253723 4.22046 0.294223C3.66096 0.305473 3.10671 0.411223 2.58246 0.609223C1.67496 0.959473 0.958715 1.67647 0.607715 2.58322C0.410465 3.10822 0.304715 3.66172 0.293465 4.22272C0.261215 4.94422 0.251465 5.17297 0.251465 7.00522C0.251465 8.83672 0.251465 9.06997 0.293465 9.78772C0.304715 10.3487 0.410465 10.9022 0.607715 11.428C0.959465 12.334 1.67571 13.051 2.58321 13.402C3.10521 13.606 3.65946 13.7215 4.22196 13.7395C4.94421 13.771 5.17296 13.7807 7.00446 13.7807C8.83596 13.7807 9.07071 13.7807 9.78696 13.7395C10.3472 13.7282 10.9015 13.6217 11.4265 13.4252C12.3332 13.0735 13.0495 12.3572 13.4012 11.4505C13.5985 10.9255 13.7042 10.372 13.7155 9.81097C13.7477 9.08947 13.7575 8.86072 13.7575 7.02847C13.7575 5.19622 13.7575 4.96372 13.7155 4.24597C13.7057 3.67747 13.6007 3.11422 13.3997 2.58322ZM12.4862 9.73222C12.481 10.1642 12.403 10.5925 12.253 10.9982C12.0242 11.5885 11.5585 12.055 10.969 12.2815C10.5677 12.4307 10.1447 12.5087 9.71646 12.5147C9.00397 12.5477 8.80297 12.556 6.97597 12.556C5.14747 12.556 4.96071 12.556 4.23471 12.5147C3.80796 12.5095 3.38346 12.4307 2.98296 12.2815C2.39121 12.0557 1.92246 11.5892 1.69371 10.9982C1.54671 10.5977 1.46721 10.174 1.46046 9.74647C1.42821 9.03397 1.42071 8.83297 1.42071 7.00597C1.42071 5.17822 1.42071 4.99147 1.46046 4.26472C1.46571 3.83272 1.54371 3.40522 1.69371 2.99947C1.92246 2.40772 2.39121 1.94197 2.98296 1.71547C3.38346 1.56697 3.80796 1.48822 4.23471 1.48222C4.94796 1.44997 5.14822 1.44097 6.97597 1.44097C8.80372 1.44097 8.99121 1.44097 9.71646 1.48222C10.1447 1.48747 10.5677 1.56622 10.969 1.71547C11.5585 1.94272 12.0242 2.40922 12.253 2.99947C12.4 3.39997 12.4795 3.82372 12.4862 4.25122C12.5185 4.96447 12.5267 5.16472 12.5267 6.99247C12.5267 8.81947 12.5267 9.01597 12.4945 9.73297H12.4862V9.73222Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"top"}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Discord
                    </Tooltip>
                  }
                >
                  <a
                    href="https://discord.com/invite/wDbj3SmEyx"
                    target="_blank"
                    id="link-discord"
                    title="Discord"
                    className="sc-bdvvtL sc-iUKqMP sc-iAKWXU coxBnO iMgzEo sc-fHeRUh fVArpE"
                  >
                    <svg
                      viewBox="0 0 16 12"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu coxBnO"
                    >
                      <path
                        d="M13.1981 0.994734C12.2421 0.534315 11.2169 0.195098 10.1449 0.000814994C10.1254 -0.00293462 10.1059 0.00643586 10.0959 0.0251773C9.96401 0.27131 9.81796 0.592411 9.71568 0.844794C8.56275 0.663633 7.41574 0.663633 6.28645 0.844794C6.18415 0.586801 6.0328 0.27131 5.90036 0.0251773C5.8903 0.00706117 5.8708 -0.00230931 5.85128 0.000814994C4.77994 0.194478 3.75473 0.533694 2.79808 0.994734C2.7898 0.998482 2.7827 1.00473 2.77799 1.01285C0.83337 4.06208 0.300656 7.03635 0.561988 9.97375C0.56317 9.98812 0.570856 10.0019 0.581499 10.0106C1.86451 10.9995 3.10732 11.5999 4.32705 11.9978C4.34657 12.0041 4.36725 11.9966 4.37968 11.9797C4.6682 11.5662 4.9254 11.1301 5.14592 10.6715C5.15894 10.6447 5.14651 10.6128 5.11992 10.6022C4.71196 10.4398 4.3235 10.2417 3.94983 10.0169C3.92027 9.99874 3.91791 9.95437 3.9451 9.93313C4.02373 9.87129 4.10239 9.80694 4.17747 9.74197C4.19106 9.73011 4.20999 9.7276 4.22596 9.7351C6.6808 10.9114 9.33846 10.9114 11.7643 9.7351C11.7803 9.72698 11.7992 9.72949 11.8134 9.74135C11.8885 9.80632 11.9672 9.87129 12.0464 9.93313C12.0736 9.95437 12.0718 9.99874 12.0422 10.0169C11.6686 10.2461 11.2801 10.4398 10.8716 10.6016C10.845 10.6122 10.8331 10.6447 10.8462 10.6715C11.0714 11.1295 11.3286 11.5655 11.6118 11.9791C11.6236 11.9966 11.6449 12.0041 11.6644 11.9978C12.8901 11.5999 14.1329 10.9995 15.4159 10.0106C15.4271 10.0019 15.4342 9.98874 15.4354 9.97438C15.7482 6.57842 14.9116 3.62853 13.2176 1.01347C13.2135 1.00473 13.2064 0.998482 13.1981 0.994734ZM5.51251 8.18518C4.77344 8.18518 4.16446 7.47302 4.16446 6.59842C4.16446 5.72381 4.76163 5.01165 5.51251 5.01165C6.2693 5.01165 6.87238 5.73006 6.86055 6.59842C6.86055 7.47302 6.26338 8.18518 5.51251 8.18518ZM10.4967 8.18518C9.75766 8.18518 9.14868 7.47302 9.14868 6.59842C9.14868 5.72381 9.74583 5.01165 10.4967 5.01165C11.2535 5.01165 11.8566 5.73006 11.8448 6.59842C11.8448 7.47302 11.2535 8.18518 10.4967 8.18518Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </OverlayTrigger>
                {/* <OverlayTrigger
                  placement={'top'}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Coming Soon.
                    </Tooltip>
                  }
                >

                  <a
                    href="https://t.me/rarible"
                    target="_blank"
                    id="link-telegram"
                    title="Telegram"
                    className="sc-bdvvtL sc-iUKqMP sc-iAKWXU coxBnO iMgzEo sc-fHeRUh fVArpE"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu coxBnO"
                    >
                      <path
                        d="M20.6601 4.22511C20.3531 3.96474 19.8708 3.92749 19.3722 4.12768H19.3713C18.8469 4.33811 4.52653 10.4806 3.94356 10.7315C3.83753 10.7684 2.91149 11.1139 3.00688 11.8835C3.09203 12.5774 3.8363 12.8648 3.92719 12.898L7.56787 14.1446C7.80941 14.9486 8.69983 17.915 8.89674 18.5488C9.01956 18.9438 9.21975 19.4629 9.5706 19.5698C9.87846 19.6885 10.1847 19.58 10.3828 19.4245L12.6087 17.3599L16.2019 20.1622L16.2874 20.2133C16.5314 20.3214 16.7652 20.3755 16.9883 20.3755C17.1606 20.3755 17.326 20.3431 17.4841 20.2784C18.0224 20.0574 18.2377 19.5444 18.2603 19.4863L20.9442 5.53557C21.108 4.79048 20.8803 4.41139 20.6601 4.22511ZM10.7787 14.6432L9.55054 17.9183L8.32237 13.8244L17.7383 6.86485L10.7787 14.6432Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={'top'}
                  // show={'show'}
                  overlay={
                    <Tooltip id={`tooltip-top`} className="toolTipDiv">
                      Coming Soon.
                    </Tooltip>
                  }
                >

                  <a
                    href="https://www.youtube.com/channel/UC2v3aVwed777Sxj7pjrpK9Q"
                    target="_blank"
                    id="link-youtube"
                    title="Youtube"
                    className="sc-bdvvtL sc-iUKqMP sc-iAKWXU coxBnO iMgzEo sc-fHeRUh fVArpE"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width="24"
                      height="24"
                      xlmns="http://www.w3.org/2000/svg"
                      className="sc-bdvvtL sc-iCfMLu coxBnO"
                    >
                      <path
                        d="M21.593 7.20301C21.363 6.34501 20.688 5.66801 19.831 5.43701C18.265 5.00701 12 5.00001 12 5.00001C12 5.00001 5.73596 4.99301 4.16896 5.40401C3.32896 5.63301 2.63496 6.32501 2.40296 7.18201C1.98996 8.74801 1.98596 11.996 1.98596 11.996C1.98596 11.996 1.98196 15.26 2.39196 16.81C2.62196 17.667 3.29696 18.344 4.15496 18.575C5.73696 19.005 11.985 19.012 11.985 19.012C11.985 19.012 18.25 19.019 19.816 18.609C20.672 18.379 21.35 17.703 21.583 16.846C21.997 15.281 22 12.034 22 12.034C22 12.034 22.02 8.76901 21.593 7.20301ZM9.99596 15.005L10.001 9.00501L15.208 12.01L9.99596 15.005Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </OverlayTrigger> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  signedInUser: state.User.signedInUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// {/* <div
// className="avatar_popup mt-20"
// style={{ opacity: opacity, display: display }}
// >
// <div className="d-flex align-items-center copy-text justify-content-between">
//     {/* <span>{`${wallet?.connectedWallet.slice(0, 6)}....${wallet?.connectedWallet.slice(props.connectedWallet.length - 3)}`} </span> */}
//     <span>
//         {`${wallet?.connectedWallet.slice(
//             0,
//             6
//         )}...${wallet?.connectedWallet.slice(
//             wallet?.connectedWallet.length - 3
//         )}`}{" "}
//     </span>
//     <Link to="/wallet-connect" className="ml-2">
//         <i className="fal fa-copy"></i>
//     </Link>
// </div>
// <div className="d-flex align-items-center mt-10">
//     <div className="info ml-10">
//         <p className="text-sm font-book text-gray-400">
//             Balance
//         </p>
//         <p className="w-full text-sm font-bold text-green-500">
//             {String(balance).slice(0, 6)} ETH
//         </p>
//     </div>
// </div>
// <div className="hr"></div>
// <div className="links mt-20">
//     <Link to={`/authors-02/auther?id=${wallet?.user?._id}`}>
//         <i className="fab fa-accusoft"></i>{" "}
//         <span> My items</span>
//     </Link>
//     <Link className="mt-10" to="/edit-profile">
//         <i className="fas fa-pencil-alt"></i>{" "}
//         <span> Edit Profile</span>
//     </Link>
//     <div
//         className="mt-10 aLInk"
//         id="logout"
//         onClick={() => {
//             props.logout(navigate, props.setSearch);
//         }}
//     >
//         <p>
//             <i className="fal fa-sign-out"></i>{" "}
//             <span> Logout</span>
//         </p>
//     </div>
// </div>
// </div> */}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
// import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import img1 from "../assets/images/box-item/image-box-6.jpg";
// import avt from "../assets/images/avatar/avt-9.jpg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mintNft } from "../module/action/user-task";
import Spinner from "./spinner";
// import { color } from "@mui/system";
import HeaderNew from "../components/header/HeaderNew";
import { ParticleComponent } from "./ParticleComponent";
import CardModal from "../components/layouts/CardModal";
import { useAlert } from "react-alert";

const CreateItem = (props) => {
  let alert = useAlert();
  const [dataObject, setDataObject] = useState({
    title: "",
    description: "",
    nftImg: "",
    royality: 0,
    size: "",
    abstraction: "Art",
  });
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState();
  const [modalShow, setModalShow] = useState(false);
  const clearState = () => {
    setDataObject({
      title: "",
      description: "",
      nftImg: "",
      royality: "",
      size: "",
      abstraction: "Art",
    });
    setImage()
  };
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  useEffect(() => {
    if (dataObject.nftImg) {
      getBase64(dataObject.nftImg); // prints the base64 string
    }
  }, [dataObject]);

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

    // console.log(scrollTop)
  };

  return (
    <div className="create-item">
      {/* <ParticleComponent /> */}
      <HeaderNew search={true} setSearch={false} />

      <section className="flat-title-page">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create NFT</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="mainSilde">
                <div className="slider-item itemBackground"></div>
                {/* <div className="wishlist-button heart">
                  <span className="number-like"> {0}</span>
                </div> */}

                <div className="nftLinkDIv">
                  <div
                    className="NFTCardCust"
                    style={{ backgroundImage: `url('${image}')` }}
                  >
                    {/* <div className='cardDetailParent'> */}

                    <div className="cardDetail">
                      <div className="row1Details">
                        <div className="nameBox">
                          <h5>{dataObject.title}</h5>

                          <p>{"Saqib"}</p>
                        </div>

                        <div className="priceBox">
                          <h4>{price} ETH</h4>
                          {/* <div className='lastPrice'>
                          <p>last Price</p>
                          <p>32.22</p>
                        </div> */}
                        </div>
                      </div>
                      <div className="row2Details">
                        <div className="id">
                          <h5>#0000</h5>
                        </div>
                        <div className="detail">
                          <p>{dataObject.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="sc-card-product">
                <div className="card-media">
                  <Link to="/item-details-01">
                    <img src={img1} alt="Axies" />
                  </Link>
                  <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link>
                  <div className="featured-countdown">
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>
                    <Link to="/item-details-01">"Cyber Doberman #766”</Link>
                  </h5>
                  <div className="tags">bsc</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/author-02">Freddie Carpenter</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link
                    to="/wallet-connect"
                    className="sc-button style bag fl-button pri-3"
                  >
                    <span>Place Bid</span>
                  </Link>
                  <Link to="/activity-01" className="view-history reload">
                    View History
                  </Link>
                </div>
              </div> */}
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <form
                  action="#"
                  // onSubmit={() => {
                  //   props.mintNft(dataObject);
                  // }}
                >
                  <h4 className="title-create-item">Upload file</h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control"
                      name="file"
                      onChange={(e) => {
                        setDataObject((preData) => {
                          return { ...preData, nftImg: e.target.files[0] };
                        });
                      }}
                      required
                    />
                  </label>
                </form>
                <div className="flat-tabs tab-create-item">
                  <h4 className="title-create-item">Select method</h4>
                  <Tabs>
                    <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-clock"></span>Time Auctions <sub>Coming Soon</sub>
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids <sub>Coming Soon</sub>
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <form
                        action="#"
                        onSubmit={(e) => {
                          e.preventDefault();
                          props.mintNft(
                            dataObject,
                            alert,
                            "NFT Minted Successfully",
                            clearState
                          );
                        }}
                      >
                        {/* <h4 className="title-create-item">Price</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item (ETH)"
                          onChange={(ev) => setPrice(ev.target.value)}

                        />
 */}
                        <h4 className="title-create-item">Title</h4>
                        <input
                          value={dataObject.title}
                          type="text"
                          placeholder="Item Name"
                          onChange={(e) => {
                            setDataObject((preData) => {
                              return { ...preData, title: e.target.value };
                            });
                          }}
                          required
                        />

                        <h4 className="title-create-item">Description</h4>
                        <textarea
                          value={dataObject.description}
                          placeholder="e.g. “This is very limited item”"
                          onChange={(e) => {
                            setDataObject((preData) => {
                              return {
                                ...preData,
                                description: e.target.value,
                              };
                            });
                          }}
                          required
                        ></textarea>

                        <div className="row-form style-3">
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Royalties</h4>
                            <input
                              value={dataObject.royality}
                              type="number"
                              placeholder="5%"
                              required
                              onChange={(e) => {
                                setDataObject((preData) => {
                                  return {
                                    ...preData,
                                    royality: e.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Size</h4>
                            <input
                              value={dataObject.size}
                              type="text"
                              placeholder="e.g. “size”"
                              required
                              onChange={(e) => {
                                setDataObject((preData) => {
                                  return {
                                    ...preData,
                                    size: e.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className="inner-row-form style-2">
                            <h4 className="title-create-item">Abstraction</h4>

                            <div className="">
                              <div id="item-create" className="dropdown">
                                <Link to="#" className="btn-selector nolink">
                                  {dataObject.abstraction}
                                </Link>
                                <ul>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Art",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Art</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Music",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Music</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Domain Names",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Domain Names</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Virtual World",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Virtual World</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Trading Cards",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Trading Cards</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Sports",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Sports</span>
                                  </li>
                                  <li
                                    onClick={() => {
                                      setDataObject((pre) => {
                                        return {
                                          ...pre,
                                          abstraction: "Utility",
                                        };
                                      });
                                    }}
                                  >
                                    <span>Utility</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="mintNFTButton"
                          style={{ marginTop: "30px" }}
                          // onClick={() => {
                          //   props.mintNft(dataObject);
                          // }}
                          type="submit"
                          disabled={props.mintingLoader}
                        >
                          {props.mintingLoader ? <Spinner /> : `Mint NFT`}
                        </button>
                        {/* <button
                        style={{ marginTop: "30px" }}
                        onClick={() => {
                          console.log(dataObject);
                        }}
                        >
                        check
                      </button> */}
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item (ETH)"
                          onChange={(ev) => setPrice(ev.target.value)}
                        />

                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date2"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date2"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      mintNft,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);

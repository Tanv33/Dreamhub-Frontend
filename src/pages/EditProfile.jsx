import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/avatar/avata_profile.jpg";
import bg1 from "../assets/images/backgroup-secsion/option1_bg_profile.jpg";
import bg2 from "../assets/images/backgroup-secsion/option2_bg_profile.jpg";
import { connect, useSelector } from "react-redux";
import { props } from "vue-popperjs";
import { bindActionCreators } from "redux";
import { updateProfile } from "../module/action/user-task";
import { BASE_URL } from "../constants";
import HeaderNew from "../components/header/HeaderNew";
import { ParticleComponent } from "./ParticleComponent";
import { useAlert } from "react-alert";
import Spinner from "./spinner";

const EditProfile = (props) => {
  const user = useSelector((e) => e.wallet.user);
  const updateProfileLoader = useSelector((e) => e.User.updateProfileLoader);
  // console.log(user);
  let alert = useAlert();
  const [profileObject, SetprofileObject] = useState({
    full_Name: user?.full_Name,
    email: user?.email,
    bio: user?.bio,
    url: user?.url,
    twitter: user?.twitter,
    facebook: user?.facebook,
    instagram: user?.instagram,
    discord: user?.discord,
  });
  const [profileImg, setProfileImg] = useState(false);
  const [coverImg, setCoverImg] = useState(false);
  const navigate = useNavigate()

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

  const [profileImg64, setProfileImg64] = useState(false);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function Main(profileImg) {
    const file = profileImg;
    try {
      const result = await toBase64(file);
      console.log(result);
      setProfileImg64(result);
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    if (profileImg) {
      Main(profileImg);
    }
  }, [profileImg]);

  return (
    <div className="EditProfile">
      {/* <ParticleComponent /> */}
      <HeaderNew search={true} setSearch={false} />

      <section className="flat-title-page">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Edit Profile</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="tayson" />
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="sc-card-profile text-center">
                <div className="card-media">
                  <img
                    id="profileimg"
                    src={
                      profileImg64
                        ? profileImg64
                        : user?.profile_img
                        ? `${user?.profile_img}`
                        : avt
                    }
                    alt="Axies"
                  />
                </div>
                {/* <div id="upload-profile">
                  <Link to="#" className="btn-upload">
                    Upload New Photo{" "}
                  </Link>
                  <input
                    id="tf-upload-img"
                    type="file"
                    name="profile"
                    required=""
                  />
                </div>
                <Link to="#" className="btn-upload style2">
                  Delete
                </Link> */}
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12 col-12">
              <div className="form-upload-profile">
                <h4 className="title-create-item">Choice your Profile image</h4>
                <div className="option-profile clearfix">
                  <form action="#">
                    <label className="uploadFile">
                      <input
                        type="file"
                        className="inputfile form-control"
                        name="file"
                        onChange={(e) => {
                          setProfileImg(e.target.files[0]);
                        }}
                      />
                    </label>
                  </form>
                  <div className="image">
                    <img src={bg1} alt="Axies" />
                  </div>
                  <div className="image style2">
                    <img src={bg2} alt="Axies" />
                  </div>
                </div>
                <h4 className="title-create-item">Choice your Cover image</h4>
                <div className="option-profile clearfix">
                  <form action="#">
                    <label className="uploadFile">
                      <input
                        type="file"
                        className="inputfile form-control"
                        name="file"
                        onChange={(e) => {
                          setCoverImg(e.target.files[0]);
                        }}
                      />
                    </label>
                  </form>
                  <div className="image">
                    <img src={bg1} alt="Axies" />
                  </div>
                  <div className="image style2">
                    <img src={bg2} alt="Axies" />
                  </div>
                </div>

                <form
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // console.log(profileObject);
                    props.updateProfile(profileObject, profileImg, coverImg, alert, 'Profile has been updated successfully',navigate);
                  }}
                  className="form-profile"
                >
                  <div className="form-infor-profile">
                    <div className="info-account">
                      <h4 className="title-create-item">Account info</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Display name</h4>
                        <input
                          type="text"
                          placeholder="Trista Francis"
                          required
                          value={profileObject?.full_Name}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                full_Name: e.target.value,
                              };
                            });
                          }}
                        />
                      </fieldset>
                      {/* <fieldset>
                        <h4 className="title-infor-account">Custom URL</h4>
                        <input
                          type="text"
                          placeholder="Axies.Trista Francis.com/"
                          required
                          value={profileObject?.url}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                url: e.target.value,
                              };
                            });
                          }}
                        />
                      </fieldset> */}
                      <fieldset>
                        <h4 className="title-infor-account">Email</h4>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          required
                          value={profileObject?.email}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                email: e.target.value,
                              };
                            });
                          }}
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Bio</h4>
                        <textarea
                          tabIndex="4"
                          rows="5"
                          required
                          value={profileObject?.bio}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                bio: e.target.value,
                              };
                            });
                          }}
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="info-social">
                      <h4 className="title-create-item">Your Social media</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Facebook</h4>
                        <input
                          type="text"
                          placeholder="Facebook username"
                          required
                          value={profileObject?.facebook}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                facebook: e.target.value,
                              };
                            });
                          }}
                        />
                        {/* <Link to="#" className="connect">
                          <i className="fab fa-facebook"></i>Connect to face
                          book
                        </Link> */}
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Twitter</h4>
                        <input
                          type="text"
                          placeholder="Twitter username"
                          required
                          value={profileObject?.twitter}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                twitter: e.target.value,
                              };
                            });
                          }}
                        />
                        {/* <Link to="#" className="connect">
                          <i className="fab fa-twitter"></i>Connect to Twitter
                        </Link> */}
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Instagram</h4>
                        <input
                          type="text"
                          placeholder="Instagram username"
                          required
                          value={profileObject?.instagram}
                          onChange={(e) => {
                            SetprofileObject((preData) => {
                              return {
                                ...preData,
                                instagram: e.target.value,
                              };
                            });
                          }}
                        />
                        {/* <Link to="#" className="connect">
                          <i className="icon-fl-vt"></i>Connect to Discord
                        </Link> */}
                      </fieldset>
                    </div>
                  </div>
                  <button
                    className="tf-button-submit mg-t-15"
                    type="submit"
                    disabled={updateProfileLoader}
                  >
                    {updateProfileLoader ? <Spinner /> : `Update Profile`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateProfile,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

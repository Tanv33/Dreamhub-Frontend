import React, { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import SpotLight from "./SpotLight";
import "./home.scss";
import $ from "jquery";
// import searchImage from './../../../assets/images/fondoextramacalidad.png'
import { useAlert } from "react-alert";

function SearchSection(props) {
  const [searchDropDown, setSearchDropDown] = useState(false);
  const searchInput = useRef();
  const notUsed = useRef();
  let alert = useAlert();
  useEffect(() => {
    $(".txt").html(function (i, html) {
      var chars = $.trim(html).split("");
      return "<span>" + chars.join("</span><span>") + "</span>";
    });

    window.addEventListener("keyup", (ev) => {
      if (ev.keyCode === 70) {
        setSearchDropDown(true);
        searchInput.current.focus();
      }
      if (ev.keyCode === 27) {
        setSearchDropDown(false);
        searchInput.current.blur();
      }
    });
  }, []);
  return (
    <Fragment>
      <section className="tf-section SearchSection">
        <div className="themesflat-container">
          <div className="innerSearch">
            {/* <img src={searchImage}/> */}
            <h2 className="tf-title">
              If you can <span className="txt anim-text-flow">Dream</span> it,{" "}
              <br />
              you can create it
            </h2>

            <div
              className="inputSearch"
              onBlur={() => setSearchDropDown(false)}
            >
              <input
                onFocus={() => setSearchDropDown(true)}
                placeholder="Search by collection, NFT, or user"
                ref={!props.onHeader ? searchInput : notUsed}
              />
              <div className="buttonSearch">
                <div className="button">{searchDropDown ? "esc" : "F"}</div>
              </div>
              <div
                className="searchDropDown"
                onBlur={() => console.log(false)}
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
            <div className="coinNameSearchDiv">
              <div className="coinNameSearch">Ethereum</div>
              <div className="coinNameSearch">Fantom</div>
            </div>
          </div>
        </div>
        <SpotLight />
      </section>
    </Fragment>
  );
}

export default SearchSection;

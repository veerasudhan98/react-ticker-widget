import React, { Component } from "react";
import { connect } from "react-redux";

import BitfinexSocket from "./BitfinexSocket";
import numberWithCommas from "../utils/numberWithCommas";

class Ticker extends Component {
  render() {
    const { lastPrice, volume, high, low, dailyChange, dailyChangeRelative } =
      this.props.widget;

    return (
      <div className="ui-panel bg-wrap main-ticker custom-scrollbar">
        <div className="main-ticker__wrapper">
          <div className="main-ticker_container">
            <img
              src="https://static.bitfinex.com/images/icons/BTC-alt.svg"
              alt="icon"
              style={{
                width: "40px",
                height: "40px",
                flex: "0 0 40px",
                color: "white",
                margin: "5px",
                display: "flex",
                filter: "saturate(0) brightness(180%)",
              }}
            ></img>
            <div className="main-ticker_items">
              <div>
                <span className="ui-tooltip ui-tooltip--underline ui-tooltip--cursor-help">
                  <p style={{ margin: "2px" }}>
                    <span>
                      <span>BTC</span>
                      <span className="show-soft">/</span>
                      <span>USD </span>
                    </span>
                    {/* <button></button> */}
                    <img
                      src="https://img.icons8.com/metro/104/ffffff/info.png"
                      alt="info"
                      width="12px"
                    />
                  </p>
                </span>
              </div>
              <div>
                <p style={{ margin: "2px" }}>
                  <span style={{ paddingRight: "55px" }}>{lastPrice}</span>
                </p>
              </div>
              <div>
                <span className="show-soft">VOL</span>
                <span className="trigger ui-tooltip ui-tooltip--underline ui-tooltip--cursor-help">
                  <span>{volume}</span>
                </span>
                <span className="show-soft">BTC</span>
              </div>
              <div>
                <span
                  className={
                    dailyChange < 0 ? "bfx-red-text" : "bfx-green-text"
                  }
                >
                  <span>
                    {numberWithCommas(
                      Math.round(
                        dailyChange < 0 ? -1 * dailyChange : dailyChange
                      )
                    )}
                  </span>
                  {dailyChange < 0 ? (
                    <img
                      src="https://img.icons8.com/android/96/fa314a/sort-down.png"
                      alt="down"
                      width="15px"
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/android/24/26e07f/sort-up.png"
                      alt="up"
                      width="15px"
                    />
                  )}
                  (<span className=" ">{dailyChangeRelative}</span>
                  %)
                </span>
              </div>
              <div>
                <span className="show-soft">LOW</span>
                <span className=" " style={{ paddingRight: "26px" }}>
                  {low}
                </span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="show-soft">HIGH</span>
                <span style={{ paddingRight: "27px" }}>{high}</span>
              </div>
            </div>
          </div>
          <div
            className="ranking-container"
            style={{ textAlign: "left", marginLeft: "52px", padding: "2px" }}
          >
            <span
              className="trigger ui-tooltip ui-tooltip--underline ui-tooltip--cursor-help"
              style={{ fontSize: "12px" }}
            >
              Your{" "}
              <span>
                <span style={{ fontSize: "12px" }}>BTC</span>
                <span className="show-soft">/</span>
                <span style={{ fontSize: "12px" }}>USD </span>
                <span style={{ fontSize: "12px" }}>Rank</span>
              </span>
            </span>
          </div>
        </div>

        <section className="main-ticker_buttons">
          <span className="santiment-button">
            <img
              src="https://trading.bitfinex.com/static/media/san-graph.71b1a5b2.svg"
              alt="analy"
              height="12"
              style={{ paddingTop: "10px" }}
            />
            <img
              src="https://trading.bitfinex.com/static/media/san-icon.3f9989ad.svg"
              alt="ques"
              height="15"
              style={{ paddingTop: "10px" }}
            />
            <br></br>
            <BitfinexSocket />
          </span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    widget: state.content,
  };
};
export default connect(mapStateToProps)(Ticker);

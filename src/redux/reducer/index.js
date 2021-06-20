import { UPDATE_TICKER, UPDATE_TICKER_FAILED } from "../action/type";
//utils
import numberWithCommas from "../../utils/numberWithCommas";

//initial state for widget component
const initialState = {
  lastPrice: 0,
  volume: 0,
  high: 0,
  low: 0,
  dailyChange: 0,
  dailyChangeRelative: 0,
};

export default function widgetReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TICKER:
      //rounding to max of 2 digit after the decimal point in % returned (dailyChangeRelative)
      //also removing "-" sign for the same
      let relativeChange =
        action.payload[5] * 100 < 0
          ? (-1 *
              Math.round((action.payload[5] * 100 + Number.EPSILON) * 100)) /
            100
          : Math.round((action.payload[5] * 100 + Number.EPSILON) * 100) / 100;
      return {
        ...state,
        //rounding and adding commas to amount
        lastPrice: numberWithCommas(Math.round(action.payload[6])),
        volume: numberWithCommas(Math.round(action.payload[7])),
        high: numberWithCommas(Math.round(action.payload[8])),
        low: numberWithCommas(Math.round(action.payload[9])),
        //commas will be added on the component(after validation)
        dailyChange: action.payload[4],
        dailyChangeRelative: relativeChange,
      };
    case UPDATE_TICKER_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}

//response structure

// // Trading pairs
// [
//   CHANNEL_ID,
//   [
//     BID,
//     BID_SIZE,
//     ASK,
//     ASK_SIZE,
//     DAILY_CHANGE,
//     DAILY_CHANGE_RELATIVE,
//     LAST_PRICE,
//     VOLUME,
//     HIGH,
//     LOW
//   ]
// ]

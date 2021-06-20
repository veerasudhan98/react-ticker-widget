import { UPDATE_TICKER, UPDATE_TICKER_FAILED } from "./type";

//update the action for every socket response
export const updateWidget = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TICKER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_TICKER_FAILED,
    });
  }
};

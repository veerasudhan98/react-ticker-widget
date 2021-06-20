import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import widgetReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["content"],
};

const rootReducer = combineReducers({
  content: widgetReducer,
});

export default persistReducer(persistConfig, rootReducer);

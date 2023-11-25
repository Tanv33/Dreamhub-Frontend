import { combineReducers } from "redux";
import themeStore from "./store/theme";
import wallet from "./store/wallet";
import User from "./store/User";
import blogs from "./store/blogs";

export default combineReducers({
  wallet: wallet,
  themeStore: themeStore,
  User: User,
  blog: blogs
});

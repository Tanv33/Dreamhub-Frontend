import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Provider } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider, useAlert } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <AlertProvider template={AlertTemplate} {...options}>
      <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

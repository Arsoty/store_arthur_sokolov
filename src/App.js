import React from "react";
import Header from "./components/Header.js";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main.js";
import Cart from "./components/Cart.js";
import Good from "./components/Good.js";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/good" element={<Good />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

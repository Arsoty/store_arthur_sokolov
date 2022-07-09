import React from "react";
import "../styles/Header.css";
import { actionGetCats, getCat } from "../store/actions/GetGQL";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalCart from "./ModalCart";
import { actionCartModalShow } from "../store/reducers/CartModalReducer";
import { actionCurrencyChoise } from "../store/reducers/CurrencyReducer";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      catName: "all",
      cat: [],
      cats: [],
      showModal: false,
      currency: this.props.curr,
    };
  }

  componentDidMount() {
    actionGetCats().then((data) => this.setState({ cats: data }));
    this.props.getCat(this.state.catName);
    console.log(this.props.cartAmount);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.catName !== prevState.catName) {
      this.props.getCat(this.state.catName);
    }
  }

  render() {
    return (
      <header className="header">
        <div className="categories">
          {this.state.cats.map((cat) => (
            <div
              className={
                this.state.catName === cat.name ? "chosenCategory" : "category"
              }
              onClick={() => {
                this.setState({ catName: cat.name });
              }}
            >
              {cat.name.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="logoBox">
          <Link to="/">
            <img
              src="https://i.postimg.cc/mky1xMj3/image.png"
              className="logo"
            ></img>
          </Link>
        </div>
        <div className="info">
          <div>
            <select
              onChange={(e) => {
                this.props.currChoise(e.target.value);
                this.setState({ currency: e.target.value });
              }}
              className="select"
              value={this.state.currency}
            >
              <option value="USD">$</option>
              <option value="GBP">£</option>
              <option value="AUD">A$</option>
              <option value="JPY">¥</option>
              <option value="RUB">₽</option>
            </select>
          </div>
          <div
            onClick={() => {
              this.setState({ showModal: !this.state.showModal });
              this.props.showModalAction(!this.state.showModal);
            }}
            className="cartInfo"
          >
            <img
              src="https://i.postimg.cc/rsrWKKxg/image-removebg-preview-3.png"
              className="cart"
            ></img>
            <div className="cartAmount">{this.props.cartAmount}</div>
          </div>
          <ModalCart visibility={this.state.showModal} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cat: state.cat,
    cartAmount: Object.values(state.cart).reduce(
      (acc, current) => +acc + +current.count,
      0
    ),
    curr: state.curr?.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCat: (cat) => dispatch(getCat(cat)),
    showModalAction: (showModal) => dispatch(actionCartModalShow(showModal)),
    currChoise: (curr) => dispatch(actionCurrencyChoise(curr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

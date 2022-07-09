import React from "react";
import "../styles/Cart.css";
import { connect } from "react-redux";
import {
  actionCartAdd,
  actionCartChange,
  actionCartClear,
  actionCartRemove,
} from "../store/reducers/CartReducer";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {},
    };
  }

  componentDidMount() {
    this.setState({ cart: this.props.cart });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.cart) !== JSON.stringify(prevProps.cart)) {
      this.setState({ cart: this.props.cart });
    }
  }

  render() {
    return (
      <div className={this.props.modalShowed ? "dark" : "default"}>
        <div className="cart">
          <div className="title">CART</div>
          <div className="cartInfoCart">
            {Object.values(this.state.cart).map((good) => (
              <div className="cartBox">
                <div className="brandAndNameCart">
                  <div className="brandCart">{good?.good?.brand}</div>
                  <div className="nameCart">{good?.good?.name}</div>
                  <div className="priceCart">
                    {`${
                      good.good?.prices.find(
                        (el) => el.currency?.label === this.props.curr
                      ).amount
                    } ${
                      good.good?.prices.find(
                        (el) => el.currency?.label === this.props.curr
                      ).currency.symbol
                    }`}
                  </div>
                </div>
                <div className="imgAndBtns">
                  <div className="btns">
                    <button
                      onClick={() => this.props.cartAdd(good?.good, 1)}
                      className="increase"
                    >
                      +
                    </button>
                    <input
                      type="number"
                      value={good?.count}
                      onChange={(e) =>
                        this.props.cartChange(good?.good, +e.target.value)
                      }
                      className="quantity"
                    ></input>
                    <button
                      onClick={() => {
                        if (good?.count > 1) {
                          this.props.cartAdd(good?.good, -1);
                        } else {
                          console.log(good?.good);
                          this.props.cartRemove(good?.good);
                        }
                      }}
                      className="decrease"
                    >
                      -
                    </button>
                  </div>
                  <img
                    className="baseImage"
                    src={good?.good?.gallery?.slice()[0]}
                  ></img>
                </div>
              </div>
            ))}
          </div>
          <div className="finalInfo">
            <button
              className="cartClear"
              onClick={() => this.props.cartClear()}
            >
              CLEAR CART
            </button>
            <div className="tax">
              Tax 21%:
              {(
                (Object.values(this.state.cart).reduce(
                  (acc, current) =>
                    +acc +
                    +current.count *
                      +current.good?.prices?.find(
                        (el) => el.currency?.label === this.props.curr
                      ).amount,
                  0
                ) /
                  100) *
                21
              ).toFixed(2)}
            </div>
            <div className="quantityCart">
              Quantity:
              {Object.values(this.state.cart).reduce(
                (acc, current) => +acc + +current.count,
                0
              )}
            </div>
            <div className="total">
              Total:
              {Object.values(this.state.cart)
                .reduce(
                  (acc, current) =>
                    +acc +
                    +current.count *
                      +current.good?.prices?.find(
                        (el) => el.currency?.label === this.props.curr
                      ).amount,
                  0
                )
                .toFixed(2)}
            </div>
            <button className="cartOrder">ORDER</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    modalShowed: state.modal?.visibility,
    curr: state.curr?.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartAdd: (good, count) => dispatch(actionCartAdd(good, count)),
    cartChange: (good, count) => dispatch(actionCartChange(good, count)),
    cartRemove: (good) => dispatch(actionCartRemove(good)),
    cartClear: () => dispatch(actionCartClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

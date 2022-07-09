import React from "react";
import "../styles/ModalCart.css";
import { connect } from "react-redux";
import {
  actionCartAdd,
  actionCartChange,
  actionCartClear,
  actionCartRemove,
} from "../store/reducers/CartReducer";
import { Link } from "react-router-dom";
import { actionCartModalShow } from "../store/reducers/CartModalReducer";

class ModalCart extends React.Component {
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
      <div className={`${this.props.visibility ? "show" : "hide"}`}>
        <div className="cartModal">
          <div className="titleModal">MY BAG</div>
          <div className="cartInfoCartModal">
            {Object.values(this.state.cart).map((good) => (
              <div className="cartBoxModal">
                <div className="brandAndNameCartModal">
                  <div className="brandCartModal">{good?.good?.brand}</div>
                  <div className="nameCartModal">{good?.good?.name}</div>
                  <div className="priceCartModal">
                    {good?.good?.prices?.slice()[0].amount}
                  </div>
                </div>
                <div className="imgAndBtnsModal">
                  <div className="btnsModal">
                    <button
                      onClick={() => this.props.cartAdd(good?.good, 1)}
                      className="increaseModal"
                    >
                      +
                    </button>
                    <input
                      type="number"
                      value={good?.count}
                      onChange={(e) =>
                        this.props.cartChange(good?.good, +e.target.value)
                      }
                      className="quantityModal"
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
                      className="decreaseModal"
                    >
                      -
                    </button>
                  </div>
                  <img
                    className="baseImageModal"
                    src={good?.good?.gallery?.slice()[0]}
                  ></img>
                </div>
              </div>
            ))}
          </div>
          <div className="finalInfoModal">
            <div className="total">
              Total:
              {Object.values(this.state.cart)
                .reduce(
                  (acc, current) =>
                    +acc +
                    +current.count * +current.good?.prices?.slice()[0].amount,
                  0
                )
                .toFixed(2)}
            </div>
            <div className="buttons">
              <button className="cartOrderModal">ORDER</button>
              <Link to="/cart">
                <button
                  onClick={() =>
                    this.props.showModalAction(!this.props.modalShowed)
                  }
                  className="cartCartModal"
                >
                  VIEW BAG
                </button>
              </Link>
            </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartAdd: (good, count) => dispatch(actionCartAdd(good, count)),
    cartChange: (good, count) => dispatch(actionCartChange(good, count)),
    cartRemove: (good) => dispatch(actionCartRemove(good)),
    cartClear: () => dispatch(actionCartClear()),
    showModalAction: (showModal) => dispatch(actionCartModalShow(showModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);

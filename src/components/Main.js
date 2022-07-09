import React from "react";
import "../styles/Main.css";
import { getGood } from "../store/actions/GetGQL";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
    };
  }

  componentDidMount() {
    this.setState({ goods: this.props.products });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.products?.length !== prevProps.products?.length) {
      this.setState({ goods: this.props.products });
    }
  }

  render() {
    return (
      <div className={this.props.modalShowed ? "dark" : "default"}>
        <div className="catName">{this.props?.catName?.toUpperCase()}</div>
        <div className="goodContainer">
          {this.state.goods?.map((good) => (
            <Link style={{ textDecoration: "none", color: "black" }} to="/good">
              <div
                onClick={() => this.props.getGood(good.id)}
                className="goodCard"
              >
                {good.inStock ? (
                  <img src={good.gallery[0]} className="goodImg"></img>
                ) : (
                  <>
                    <img
                      src={good.gallery[0]}
                      className="goodNotInStockImg"
                    ></img>
                    <div className="warning">OUT OF STOCK</div>
                  </>
                )}
                <div className="goodInfo">
                  <div className="goodName">{good.name}</div>
                  <div className="goodPrice">
                    {`${
                      good.prices.find(
                        (el) => el.currency?.label === this.props.curr
                      ).amount
                    } ${
                      good.prices.find(
                        (el) => el.currency?.label === this.props.curr
                      ).currency.symbol
                    }`}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cat?.cat?.products,
    catName: state.cat?.cat?.name,
    modalShowed: state.modal?.visibility,
    curr: state.curr?.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGood: (goodId) => dispatch(getGood(goodId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React from "react";
import "../styles/Main.css";
import { getCat } from "../store/actions/GetGQL";
import { connect } from "react-redux";
import "../styles/Good.css";
import { actionCartAdd } from "../store/reducers/CartReducer";

class Good extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      good: {},
    };
  }

  componentDidMount() {
    this.setState({ good: this.props.good });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.good) !== JSON.stringify(prevProps.good)) {
      this.setState({ good: this.props.good });
    }
  }

  render() {
    return (
      <div className={this.props.modalShowed ? "dark" : "default"}>
        <div className="goodPage">
          <div className="images">
            <div className="extraImages">
              {this.state.good?.gallery?.map((el, index) => {
                if (index !== 0) {
                  return <img src={el} className="smallImages"></img>;
                }
              })}
            </div>
            <img
              className="baseImage"
              src={this.state.good?.gallery?.slice()[0]}
            ></img>
          </div>
          <div className="goodInfo">
            <div className="brandAndName">
              <div className="brand">{this.state.good?.brand}</div>
              <div className="name">{this.state.good?.name}</div>
            </div>
            <div className="price">
              <div className="priceTag">Price:</div>
              <div>
                {`${
                  this.state.good?.prices?.find(
                    (el) => el.currency?.label === this.props.curr
                  ).amount
                } ${
                  this.state.good?.prices?.find(
                    (el) => el.currency?.label === this.props.curr
                  ).currency.symbol
                }`}
              </div>
            </div>
            <button
              onClick={() => this.props.addToCart(this.state.good, 1)}
              className={this.state.good?.inStock ? "btn" : "notBtn"}
              disabled={!this.state.good?.inStock}
            >
              ADD TO CART
            </button>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: this.state.good?.description }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    good: state.good?.good,
    modalShowed: state.modal?.visibility,
    curr: state.curr?.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (good, count) => dispatch(actionCartAdd(good, count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Good);

import React, { Component } from "react";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";

// Import custom components
import store from "../../../store";
import NavBar from "./common/navbar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import { changeCurrency, filterSearch } from "../../../actions";
import { connect } from "react-redux";

class HeaderOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      search: ""
    };
  }
  /*=====================
         Pre loader
         ==========================*/
  componentDidMount() {
    setTimeout(function() {
      document.querySelector(".loader-wrapper").style = "display: none";
    }, 2000);

    this.setState({ open: true });
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };
  handleSearch = e => {
	  this.setState({search:e.target.value})
    this.props.filterSearch({
      category: this.props.filters.brand,
      color: this.props.filters.attributes,
      size: this.props.filters.size,
      sortBy: this.props.filters.sortBy,
	  search: e.target.value,
	  gender:this.props.filters.gender
    });
    this.setState({ search: e.target.value })
  }

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch(e) {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch(e) {
    document.getElementById("search-overlay").style.display = "none";
	e.preventDefault();
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div>
        <header id="sticky" className="sticky">
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option"></div>
          {/*Top Header Component*/}
          <TopBar />

          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="main-menu">
                  <div className="menu-left">
                    <div className="brand-logo">
                      <LogoImage logo={this.props.logoName} />
                    </div>
                  </div>
                  <div className="menu-right pull-right">
                    {/*Top Navigation Bar Component*/}
                    <NavBar />

                    <div>
                      <div className="icon-nav">
                        <ul>
                          <li className="onhover-div mobile-search">
                            <div>
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`}
                                onClick={this.openSearch}
                                className="img-fluid"
                                alt=""
                              />
                              <i
                                className="fa fa-search"
                                onClick={this.openSearch}
                              ></i>
                            </div>
                          </li>
                          <li className="onhover-div mobile-setting">
                            <div>
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`}
                                className="img-fluid"
                                alt=""
                              />
                              <i className="fa fa-cog"></i>
                            </div>
                            <div className="show-div setting">
                              <h6>language</h6>
                              <ul>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() => this.changeLanguage("en")}
                                  >
                                    English
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() => this.changeLanguage("fn")}
                                  >
                                    French
                                  </a>{" "}
                                </li>
                              </ul>
                              <h6>currency</h6>
                              <ul className="list-inline">
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("€")
                                    }
                                  >
                                    euro
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("₹")
                                    }
                                  >
                                    rupees
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("£")
                                    }
                                  >
                                    pound
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("$")
                                    }
                                  >
                                    doller
                                  </a>{" "}
                                </li>
                              </ul>
                            </div>
                          </li>
                          {/*Header Cart Component */}
                          <CartContainer />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="search-overlay" className="search-overlay">
          <div>
            <span
              className="closebtn"
              onClick={this.closeSearch}
              title="Close Overlay"
            >
              ×
            </span>
            <div className="overlay-content">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Search a Product"
						  onChange={e => this.handleSearch(e)}
						  value={this.state.search}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary"  onClick={(e)=>this.closeSearch(e)} >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, { changeCurrency, filterSearch })(
  HeaderOne
);

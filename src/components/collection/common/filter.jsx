import React, { Component } from "react";
import { connect } from "react-redux";
import "react-input-range/lib/css/index.css";
import { SlideToggle } from "react-slide-toggle";

import { getBrands, getColors, getMinMaxPrice } from "../../../services";
import {
  filterBrand,
  filterColor,
  filterSize,
  filterGender
} from "../../../actions";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openFilter: false
    };
  }

  closeFilter = () => {
    document.querySelector(".collection-filter").style = "left: -365px";
  };

  clickBrandHendle(event, brands, index) {
    if (event.target.checked) {
      for (var i = 1; i <= index.length; i++) {
        document.getElementById(i).checked = false;
      }
      document.getElementById(brands).checked = true;
      this.props.filterBrand({
        category: [brands],
        color: this.props.filters.attributes,
        size: this.props.filters.size,
        sortBy: this.props.filters.sortBy,
        search: this.props.filters.search,
        gender: this.props.filters.gender
      });
    } else {
      this.props.filterBrand({
        category: [],
        color: this.props.filters.attributes,
        size: this.props.filters.size,
        sortBy: this.props.filters.sortBy,
        search: this.props.filters.search,
        gender: this.props.filters.gender
      });
      document.getElementById(brands).checked = false;
    }
    // removed in array unchecked value
  }

  colorHandle(event, color, index, flag) {
    if (flag === 0) {
      if (event.target.classList.contains("active")) {
        var elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function(el) {
          el.classList.remove("active");
        });
        this.props.filterColor({
          category: this.props.filters.brand,
          color: [],
          size: this.props.filters.size,
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: this.props.filters.gender
        });
      } else {
        var elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function(el) {
          el.classList.remove("active");
        });
        event.target.classList.add("active");
        this.props.filterColor({
          category: this.props.filters.brand,
          color: [color],
          size: this.props.filters.size,
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: this.props.filters.gender
        });
      }
    }
  }

  sizeHandle = (event, size, index, flag) => {
    if (flag === 1) {
      if (event.target.checked) {
        for (var i = 1; i <= index.length; i++) {
          document.getElementById(`size${i}`).checked = false;
        }
        document.getElementById(`size${size}`).checked = true;
        this.props.filterSize({
          category: this.props.filters.brand,
          color: this.props.filters.attributes,
          size: [size],
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: this.props.filters.gender
        });
      } else {
        this.props.filterSize({
          category: this.props.filters.brand,
          color: this.props.filters.attributes,
          size: [],
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: this.props.filters.gender
        });
        document.getElementById(`size${size}`).checked = false;
      }
    }
  };

  genderHandle = (event, gender, index, flag) => {
    if (flag === 1) {
      if (event.target.checked) {
        for (var x = 15; x <= 16; x++) {
          document.getElementById(`gender${x}`).checked = false;
        }
        document.getElementById(`gender${gender}`).checked = true;
        this.props.filterGender({
          category: this.props.filters.brand,
          color: this.props.filters.attributes,
          size: this.props.filters.size,
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: [gender]
        });
      } else {
        this.props.filterGender({
          category: this.props.filters.brand,
          color: this.props.filters.attributes,
          size: this.props.filters.size,
          sortBy: this.props.filters.sortBy,
          search: this.props.filters.search,
          gender: []
        });
        document.getElementById(`gender${gender}`).checked = false;
      }
    }
  };

  render() {
    return (
      <div className="collection-filter-block">
        {/*brand filter start*/}
        <div className="collection-mobile-back">
          <span className="filter-back" onClick={e => this.closeFilter(e)}>
            <i className="fa fa-angle-left" aria-hidden="true"></i> back
          </span>
        </div>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                Categories
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  {this.props.filters.config.category.map(
                    (brand, index, total) => {
                      return (
                        <div
                          className="custom-control custom-checkbox collection-filter-checkbox"
                          key={brand.category_id}
                        >
                          <input
                            type="checkbox"
                            onClick={e =>
                              this.clickBrandHendle(e, brand.category_id, total)
                            }
                            value={brand.name}
                            className="custom-control-input"
                            id={brand.category_id}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={brand.category_id}
                          >
                            {brand.name}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </SlideToggle>

        {/*color filter start here*/}
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                colors
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="color-selector">
                  <ul>
                    {this.props.filters.config.attributes[1].attribute_values.map(
                      (color, index) => {
                        let flag;
                        return (
                          <li
                            style={{ backgroundColor: color.value }}
                            className={color.value}
                            title={color.value}
                            onClick={e =>
                              this.colorHandle(
                                e,
                                color.attribute_value_id,
                                null,
                                (flag = 0)
                              )
                            }
                            key={index}
                          ></li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                Size
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter ">
                  <ul>
                    {this.props.filters.config.attributes[0].attribute_values.map(
                      (color, index, total) => {
                        let flag;

                        return (
                          <div className="custom-control custom-checkbox collection-filter-checkbox ">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              title={color.value}
                              id={`size${color.attribute_value_id}`}
                              onClick={e =>
                                this.sizeHandle(
                                  e,
                                  color.attribute_value_id,
                                  total,
                                  (flag = 1)
                                )
                              }
                              key={`size${color.attribute_value_id}`}
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor={`size${color.attribute_value_id}`}
                            >
                              {color.value}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
        {/*price filter start here */}
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                Gender
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter ">
                  <ul>
                    {this.props.filters.config.attributes[2].attribute_values.map(
                      (gender, index, total) => {
                        let flag;

                        return (
                          <div className="custom-control custom-checkbox collection-filter-checkbox ">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              title={gender.value}
                              id={`gender${gender.attribute_value_id}`}
                              onClick={e =>
                                this.genderHandle(
                                  e,
                                  gender.attribute_value_id,
                                  total,
                                  (flag = 1)
                                )
                              }
                              key={`gender${gender.attribute_value_id}`}
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor={`gender${gender.attribute_value_id}`}
                            >
                              {gender.value}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  brands: getBrands(state.data.products),
  colors: getColors(state.data.products),
  prices: getMinMaxPrice(state.data.products),
  filters: state.filters
});

export default connect(mapStateToProps, {
  filterBrand,
  filterColor,
  filterSize,
  filterGender
})(Filter);

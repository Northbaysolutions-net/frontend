import React, { Component } from "react";
import { Navbar, Form, Button, FormControl, Nav } from "react-bootstrap";
import DropDown from "../DropDown/DropDown.js";
import { connect } from "react-redux";

class SubBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sortOptions: [
        { attribute_value_id: "asc", value: "Low to High" },
        { attribute_value_id: "desc", value: "High to Low" }
      ]
    };
  }

  componentDidMount() {
    let data = { name: "size" };
    this.props.ongetAllAttributes(data);

    data = { name: "color" };
    this.props.ongetAllAttributes(data);

    data = { name: "gender" };
    this.props.ongetAllAttributes(data);

    if(this.props.search !== this.state.search)
      this.setState({search : this.props.search})

    console.log("mount it!");
  }

  setProductProperty = data => {
    data["size"] = this.props.size;
    data["gender"] = this.props.gender;
    data["color"] = this.props.color;
    data["order"] = this.props.order;
    data["category_id"] = this.props.category_id;
    return data;
  };
  search = event => {
    let data = {};
    data = this.setProductProperty(data);
    data["search"] = this.state.search;
    data["pageNo"] = 1;
    this.props.ongetAllProducts(data);
  };

  handleChange = event => {
    let fleldVal = event.target.value;
    this.setState({ search: fleldVal });
  };

  setPageNo = pageNo => {
    if (pageNo < 1) return;
    if (pageNo > this.props.totalPages) return;
    let data = {};
    data = this.setProductProperty(data);
    data["search"] = this.props.search;
    data["pageNo"] = pageNo;
    this.props.ongetAllProducts(data);
  };

  render() {
    let active = this.props.pageNo;
    let items = [];
    for (
      let number = active;
      number <= this.props.totalPages && number <= active + 2;
      number++
    ) {
      let liClass = "page-item";
      if (number === active) liClass = "page-item active";
      items.push(
        <li
          className={liClass}
          key={number}
          onClick={() => this.setPageNo(number)}
        >
          <a className='page-link'> {number}</a>
        </li>
      );
    }
    return (
      <div>
        <Navbar bg='light' variant='light'>
          <Nav className='mr-auto'>
            <h4>Filter</h4>
            <DropDown
              DropDownName={"Size"}
              DropDownDetails={this.props.size_attributes}
            />
            <DropDown
              DropDownName={"Color"}
              DropDownDetails={this.props.color_attributes}
            />
            <DropDown
              DropDownName={"Gender"}
              DropDownDetails={this.props.gender_attributes}
            />
            <h4>Sort</h4>
            <DropDown
              DropDownName={"Sort by"}
              DropDownDetails={this.state.sortOptions}
            />
          </Nav>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search'
              defaultValue={this.state.search}
              onChange={this.handleChange}
              className='mr-sm-2'
            />
            <Button variant='outline-primary' onClick={this.search}>
              Search
            </Button>
          </Form>
        </Navbar>
        <div>
          <br />
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-center'>
              <li className='page-item '>
                <a
                  className='page-link'
                  tabIndex='-1'
                  onClick={() => this.setPageNo(this.props.pageNo - 1)}
                >
                  Previous
                </a>
              </li>
              {items}
              <li className='page-item'>
                <a
                  className='page-link'
                  onClick={() => this.setPageNo(this.props.pageNo + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <br />
        </div>
      </div>
    );
  }
}
const mapStoreToProps = store => {
  return {
    size_attributes: store.rSubBar.size_attributes,
    color_attributes: store.rSubBar.color_attributes,
    gender_attributes: store.rSubBar.gender_attributes,
    category_id: store.rProductsList.category_id,
    size: store.rProductsList.size,
    gender: store.rProductsList.gender,
    color: store.rProductsList.color,
    search: store.rProductsList.search,
    pageNo: store.rProductsList.pageNo,
    totalPages: store.rProductsList.totalPages,
    order: store.rProductsList.order
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    ongetAllAttributes: data =>
      dispatch({ type: "getAllAttributes", value: data }),
    ongetAllProducts: data => dispatch({ type: "getAllProducts", value: data })
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(SubBar);

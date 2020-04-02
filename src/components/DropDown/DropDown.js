import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './DropDown.css';
import { connect } from 'react-redux';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownItems: []
    };
  }

  change = (attribute_value_id, attribute) => {
    let data = {};

    data['category_id'] = this.props.category_id;
    data['size'] = this.props.size;
    data['gender'] = this.props.gender;
    data['color'] = this.props.color;
    data['order'] = this.props.order;

    if (attribute === 'Size') data['size'] = attribute_value_id;
    if (attribute === 'Color') data['color'] = attribute_value_id;
    if (attribute === 'Gender') data['gender'] = attribute_value_id;
    if (attribute === 'Sort by') data['order'] = attribute_value_id;

    data['search'] = this.props.search;
    data['pageNo'] = this.props.pageNo;

    this.props.ongetAllProducts(data);
  };
  componentDidMount() {
    this.setState({
      dropDownItems: this.props.DropDownDetails
    });
  }

  render() {
    let optionTemplate = this.props.DropDownDetails.map((v, key) => (
      <Dropdown.Item key={v.attribute_value_id} eventKey={v.attribute_value_id}>
        {v.value}
      </Dropdown.Item>
    ));

    return (
      <div>
        <DropdownButton
          value={this.props.DropDownName}
          id={this.props.DropDownName}
          onSelect={e => this.change(e, this.props.DropDownName)}
          title={this.props.DropDownName}
          size='sm'
          variant='secondary'
          className='dropdown_margin'
        >
          {optionTemplate}
        </DropdownButton>
      </div>
    );
  }
}
const mapStoreToProps = store => {
  return {
    categories: store.rNavBar.categories,
    category_id: store.rProductsList.category_id,
    size: store.rProductsList.size,
    gender: store.rProductsList.gender,
    color: store.rProductsList.color,
    search: store.rProductsList.search,
    pageNo: store.rProductsList.pageNo,
    order: store.rProductsList.order
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    ongetAllProducts: data => dispatch({ type: 'getAllProducts', value: data })
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(DropDown);

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  SEARCH_PRODUCTS_REQUEST,
  INITIAL_LANDING_VIEW_REQUEST,
} from './action-types';

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  DropdownButton,
  Container,
  Row,
} from 'react-bootstrap';
import './LandingView.css';

import CustomerInfo from '../CustomerInfo';
import ProductsGrid from '../ProductsGrid';
import Pagination from './Pagination';

class LandingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      gender: undefined,
      color: undefined,
      size: undefined,
      sort: undefined,
      categoryId: undefined,
      searchString: undefined,
      sortTitle: '',
      filterTitle: '',
    };
    this.props.initialLandingView();
  }

  search = (event) => {
    this.setState({ searchString: event.target.value });
    this.props.searchProducts(this.state.searchString);
  };
  pagination = (e) => {
    const { gender, color, size, sort, categoryId } = this.state;
    let page = parseInt(e.target.text);
    this.setState({ activePage: page });
    if (categoryId) {
      this.props.getProductsByCategory({
        categoryId,
        gender,
        color,
        size,
        sort,
        page,
      });
    } else this.props.getProducts({ page, gender, color, size, sort });
  };
  paginationNext = (e) => {
    const { gender, color, size, sort, categoryId } = this.state;
    let page = this.state.activePage + 1;
    this.setState({ activePage: page });
    if (categoryId) {
      this.props.getProductsByCategory({
        categoryId,
        gender,
        color,
        size,
        sort,
        page,
      });
    } else this.props.getProducts({ page, gender, color, size, sort });
  };
  paginationPrevious = (e) => {
    const { gender, color, size, sort, categoryId } = this.state;
    if (this.state.activePage > 1) {
      let page = this.state.activePage - 1;
      this.setState({ activePage: page });
      if (categoryId) {
        this.props.getProductsByCategory({
          categoryId,
          gender,
          color,
          size,
          sort,
          page,
        });
      } else this.props.getProducts({ page, gender, color, size, sort });
    }
  };

  handleFilter = (ek, e) => {
    if (ek == 'clear') {
      this.setState({ [e.target.id]: undefined }, () => {
        this.validateFilter();
      });
    } else {
      this.setState({ [e.target.id]: ek }, () => {
        this.validateFilter();
      });
    }
  };
  validateFilter = (v) => {
    const { gender, color, size, sort, categoryId } = this.state;
    if (categoryId) {
      this.props.getProductsByCategory({
        categoryId,
        gender,
        color,
        size,
        sort,
      });
    } else this.props.getProducts({ gender, color, size, sort });
  };

  categoryHandler = (categoryId) => {
    const { gender, color, size, sort } = this.state;
    if (categoryId == 'clear') {
      this.setState({ categoryId: undefined });
      this.props.getProducts({ gender, color, size, sort });
    } else {
      this.setState({ categoryId: categoryId });
      this.props.getProductsByCategory({
        categoryId,
        gender,
        color,
        size,
        sort,
      });
    }
  };

  render() {
    const { attributes, categories, products } = this.props;
    const { activePage } = this.state;

    return (
      <div className='major'>
        <Navbar bg='dark' variant='dark' onSelect={this.categoryHandler}>
          <Link to='/'>
            {' '}
            <Navbar.Brand>SHOPMATE</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto header'>
              {categories.map((c) => (
                <Nav.Link
                  key={c.category_id}
                  eventKey={c.category_id}
                  id={c.category_id}
                >
                  {c.name}
                </Nav.Link>
              ))}
              <Nav.Link eventKey='clear'>All Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <CustomerInfo
              loggedIn={localStorage.getItem('loggedIn')}
              name={localStorage.getItem('userName')}
            />
          </Navbar.Collapse>
        </Navbar>
        <br></br>
        <div className='filter-row'>
          <Container fluid>
            <Row className='justify-content-md-center'>
              <h3 className='text-muted'>Filters</h3>
              {attributes.map((f) => (
                <DropdownButton
                  key={f.attribute_id}
                  title={f.name}
                  variant='info'
                  className='filters'
                  onSelect={this.handleFilter}
                >
                  {f.attribute_values.map((v) => (
                    <Dropdown.Item
                      key={v.attribute_value_id}
                      eventKey={v.attribute_value_id}
                      id={f.name}
                    >
                      {v.value}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item
                    key='clear'
                    eventKey='clear'
                    id={f.name}
                    className='clear'
                  >
                    Clear
                  </Dropdown.Item>
                </DropdownButton>
              ))}

              <h3 className='sort text-muted'>sort</h3>
              <DropdownButton
                id='dropdown-basic-button'
                title='sort By'
                variant='info'
                className='filters'
                onSelect={this.handleFilter}
              >
                <Dropdown.Item id='sort' key='DESC' eventKey='DESC'>
                  High Price
                </Dropdown.Item>
                <Dropdown.Item id='sort' key='AESC' eventKey='AESC'>
                  Low Price
                </Dropdown.Item>
                <Dropdown.Item
                  id='sort'
                  key='clear'
                  eventKey='clear'
                  className='clear'
                >
                  Clear
                </Dropdown.Item>
              </DropdownButton>

              <Form inline className='filters'>
                <FormControl
                  type='text'
                  placeholder='Search'
                  className='mr-sm-2'
                  onChange={this.search}
                />
              </Form>
            </Row>
          </Container>
        </div>

        <Pagination
          activePage={activePage}
          pagination={this.pagination}
          paginationNext={this.paginationNext}
          paginationPrevious={this.paginationPrevious}
        />
        <div>
          <ProductsGrid products={products} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.landingVewStore.products,
    categories: state.landingViewStore.categories,
    attributes: state.landingViewStore.attributes,
    attributes_values: state.landingViewStore.attributes_values,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialLandingView: () => dispatch({ type: INITIAL_LANDING_VIEW_REQUEST }),
    getProducts: (data) => dispatch({ type: GET_PRODUCTS_REQUEST, data }),
    getProductsByCategory: (data) =>
      dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST, data }),
    searchProducts: (searchString) =>
      dispatch({ type: SEARCH_PRODUCTS_REQUEST, searchString }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LandingView));

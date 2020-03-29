import React, { Component } from 'react';

import Item from '../Item/Item';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';
import Paging from '../Paging/Paging';
import ProductsHeader from '../ProductsHeader/ProductsHeader';
import { connect } from 'react-redux';
import {
  getAllProducts,
  getProductsByCategory,
  resetPageNumber,
  getAllCategories
} from '../../Redux/Actions';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    pageNumber: state.pageNumber,
    products: state.products,
    totalPages: state.totalPages,
    categories: state.categories
  };
};

const mapDispatchToProps = {
  getAllProducts: getAllProducts.request,
  getProductsByCategory: getProductsByCategory.request,
  resetPageNumber: resetPageNumber,
  getAllCategories: getAllCategories.request
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      totalItemsCount: null,
      prevCategory: null,
      configurations: false,
      search: ''
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);
    let object = { page: 1, sort: 'ASC', search: '' };

    if (this.state.search !== qsAsObject.search && qsAsObject.search) {
      this.props.resetPageNumber();
      object.search = qsAsObject.search;
    } else if (qsAsObject.category) {
      let category_id;
      _.filter(this.props.categories, function(element) {
        if (element.children) {
          return _.filter(element.children, function(child) {
            if (child.name === qsAsObject.category) {
              category_id = child.category_id;
              return child;
            }
          });
        }
      });
      if (this.state.prevCategory !== category_id) {
        this.props.resetPageNumber();
        this.setState({ prevCategory: category_id });
      }
      object.category_id = category_id;
      if (qsAsObject.page) {
        object.page = this.props.pageNumber;
      }
      if (qsAsObject.sortValue) {
        object.sort = qsAsObject.sortValue;
      }
      if (this.props.categories.length > 0)
        this.props.getProductsByCategory(object);
      this.setState({
        loading: false,
        totalItemsCount: this.props.totalPages
      });
      return null;
    }

    // Make request
    if (qsAsObject.page) {
      object.page = this.props.pageNumber;
    }
    if (qsAsObject.sortValue) {
      object.sort = qsAsObject.sortValue;
    }

    this.props.getAllProducts(object);
    this.setState({
      loading: false,
      totalItemsCount: this.props.totalPages
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  updateQueryString = newValues => {
    let currentQS = queryString.parse(this.props.location.search);
    let newQS = { ...currentQS, ...newValues };
    this.props.history.push('/?' + queryString.stringify(newQS));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search);

    // Check if the query strings changed.
    let check1 = Object.entries(currentQS).some(([k, v]) => v !== oldQS[k]);
    let check2 = Object.entries(oldQS).some(([k, v]) => v !== currentQS[k]);
    let isDifferent = check1 || check2;

    // We will refetch products only when query string changes.
    if (isDifferent) {
      this.fetchData();
    }
    if (prevProps.categories !== this.props.categories) {
      this.fetchData();
    }
  }

  render() {
    let parsedQS = queryString.parse(this.props.location.search);

    if (this.state.loading) {
      return <CircularProgress className='circular' />;
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ProductsHeader
          parsedQS={parsedQS}
          updateQueryString={this.updateQueryString}
        />

        <div style={{ flex: 1 }}>
          {this.props.products.map(item => {
            return <Item key={item.product_id} item={item} />;
          })}
        </div>

        <Paging
          parsedQS={parsedQS}
          updateQueryString={this.updateQueryString}
          totalItemsCount={this.state.totalItemsCount}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

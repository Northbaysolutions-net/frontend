import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    totalProducts: state.totalProducts
  };
};

class ProductsHeader extends Component {
  render() {
    let { parsedQS, updateQueryString } = this.props;

    // Grab some values from the query string
    let sortValue = parsedQS.sortValue || 'ASC';
    let keyword = parsedQS.term;
    let category = parsedQS.category;

    let subtitle = (
      <React.Fragment>
        <span style={{ fontSize: 12, color: 'gray', marginTop: 5 }}>
          {this.props.totalProducts +
            ' result' +
            (this.props.totalProducts === 1 ? ' ' : 's ') +
            (keyword ? 'for ' : '')}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: 'gray',
              marginTop: 5
            }}
          >
            {keyword}
          </span>
        )}
      </React.Fragment>
    );

    return (
      <div>
        <div style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, fontSize: 24 }}>
            <div>{category ? category : 'All Products'}</div>
            {subtitle}
          </div>
          <Select
            value={sortValue}
            onChange={e => {
              updateQueryString({ sortValue: e.target.value });
            }}
          >
            <MenuItem value={'ASC'}>Sort by price: low to high</MenuItem>
            <MenuItem value={'DESC'}>Sort by price: high to low</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(ProductsHeader));

import React, { Component } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  showCartDlg,
  toggleMenu,
  logout,
  getConfigurations
} from '../../Redux/Actions';
import cartImage from '../../Images/logo2.png';
import Auth from '../../Auth';
import Person from '@material-ui/icons/PersonOutline';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser,
    categories: state.categories,
    filterValues: state.filterValues
  };
};

const mapDispatchToProps = {
  getConfigurations: getConfigurations.request,
  toggleMenu: toggleMenu,
  showCartDlg: showCartDlg,
  logout: logout
};

class ConnectedHeader extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      anchorEl: null,
      filterValues: {
        Size: 'Size',
        Color: 'Color',
        Gender: 'Gender'
      }
    };
  }

  componentDidMount() {
    this.props.getConfigurations();
  }

  categoryOptions = () => {
    if (this.props.categories[0]) {
      return this.props.categories[0].children.map(x => {
        return (
          <MenuItem key={x.name} value={x.name}>
            {x.name}
          </MenuItem>
        );
      });
    }
  };

  onClickSearch = () => {
    if (this.state.searchTerm !== '')
      this.props.history.push(`/?category=all&search=${this.state.searchTerm}`);
    else this.props.history.push(`/`);
  };

  render() {
    let { anchorEl } = this.state;

    return (
      <AppBar
        position='static'
        style={{ backgroundColor: '#FAFAFB', padding: 10 }}
      >
        <Toolbar>
          <div className='left-part'>
            <IconButton
              onClick={() => {
                this.props.toggleMenu();
              }}
            >
              <MenuIcon size='medium' />
            </IconButton>

            <img
              src={cartImage}
              alt={'Logo'}
              style={{ marginLeft: 10 }}
              onClick={() => {
                this.props.history.push('/');
              }}
            />
            <TextField
              label='Search products'
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
            />
            <Button
              style={{ marginLeft: 20 }}
              variant='outlined'
              color='primary'
              onClick={this.onClickSearch}
            >
              {' '}
              Search
            </Button>
            {this.props.filterValues.map(filterItem => {
              return (
                <Select
                  key={filterItem.attribute_id}
                  style={{ maxWidth: 200, marginLeft: 20 }}
                  value={filterItem.name}
                  name={filterItem.name}
                  MenuProps={{
                    style: {
                      maxHeight: 500
                    }
                  }}
                  onChange={e => {
                    this.setState({
                      filterValues: {
                        ...this.state.filterValues,
                        [e.target.name]: e.target.value
                      }
                    });
                  }}
                >
                  <MenuItem key={0} value={filterItem.name} disabled>
                    {filterItem.name}
                  </MenuItem>
                  {filterItem.attribute_values.map(item => {
                    return (
                      <MenuItem
                        key={item.attribute_value_id}
                        value={item.value}
                      >
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              );
            })}
          </div>
          <div className='right-part'>
            {!this.props.loggedInUser ? (
              <div className='login-signup'>
                <Button
                  variant='outlined'
                  style={{ marginRight: '20px', width: '90px' }}
                  color='primary'
                  onClick={() => {
                    this.props.history.push('/login');
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant='outlined'
                  style={{ marginRight: '20px', width: '90px' }}
                  color='primary'
                  onClick={() => {
                    this.props.history.push('/signup');
                  }}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <Avatar
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ backgroundColor: '#3f51b5', marginRight: 10 }}
              >
                <Person />
              </Avatar>
            )}
            <IconButton
              aria-label='Cart'
              onClick={() => {
                this.props.showCartDlg(true);
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push('/order');
                }}
              >
                Checkout page
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signout(() => {
                    this.props.logout();
                    this.props.history.push('/');
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader)
);
export default Header;

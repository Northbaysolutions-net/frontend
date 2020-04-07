import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Button } from 'react-bootstrap';

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    localStorage.clear();
  };

  render() {
    const { login, name } = this.props;
    if (login) {
      return (
        <div>
          <Button
            variant='outline-success'
            className=' mr-sm-2'
            onClick={this.logOut}
          >
            Sign Out
          </Button>
          <Navbar.Text>
            Signed in as: <a>{name}</a>
          </Navbar.Text>
        </div>
      );
    } else {
      return (
        <div>
          <Link to='/signup'>
            <Button variant='outline-success' className=' mr-sm-2'>
              Sign Up
            </Button>
          </Link>
          <Link to='/login'>
            <Button variant='outline-warning' className=' mr-sm-2'>
              Log In
            </Button>
          </Link>
        </div>
      );
    }
  }
}

export default CustomerInfo;

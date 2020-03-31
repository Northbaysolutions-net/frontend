import React, { Component } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import APIs from '../../APIs/index';
import './CheckOut.css';

const api = new APIs();

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      region: '',
      postalCode: '',
      country: ''
    };
  }

  SetFields = customer => {
    this.setState({ address1: (customer.address_1=== 'NULL'? '': customer.address_1) });
    this.setState({ address2: (customer.address_2=== 'NULL'? '': customer.address_2) });
    this.setState({ city: (customer.city=== 'NULL'? '': customer.city) });
    this.setState({ region: (customer.region=== 'NULL'? '': customer.region) });
    this.setState({ postalCode: (customer.postal_code=== 'NULL'? '': customer.postal_code) });
    this.setState({ country: (customer.country=== 'NULL'? '': customer.country) });
  };

  resetCart = () =>
  {
    this.props.onSetProductList();
    localStorage.setItem('Products', []);
    localStorage.setItem('TotalAmmount', 0);
  }

  componentDidMount() {
    this.SetFields(this.props.customer);
  }

  componentDidUpdate(prevProps) {
    const { order_id } = this.props;
    const { order_id: prevOrder_id } = prevProps;

    if (order_id !== prevOrder_id) {
      if (order_id > 0) {
        alert('Order has been placed by order ID: ' + order_id);
        this.resetCart();
      }
    }
  }

  checkOut = async () => {
    if (
      this.state.address1 === '' ||
      this.state.address2 === '' ||
      this.state.city === '' ||
      this.state.region === '' ||
      this.state.postalCode === '' ||
      this.state.country === ''
    ) 
    {
      alert('Kindly provide complete details');
    } else {
      let data = { token: this.props.token };

      await api
        .getTokenStatus(data)
        .then(response => {
          if (response.payload.status === true) {
            let data = {
              products: JSON.parse(localStorage.getItem('Products')),
              customer_address: {
                address_1: this.state.address1,
                address_2: this.state.address2,
                city: this.state.city,
                region: this.state.region,
                postal_code: this.state.postalCode,
                country: this.state.country
              },
              totalAmmount: JSON.parse(localStorage.getItem('TotalAmmount')),
              customer_id: this.props.customer_id
            };
            this.props.onPostOrder(data);
          } else {
            alert('Kindly Login again your session has been expired ');
          }
        })
        .catch(err => {
          alert('Encounter some Issue while placing cart order');
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Container className='container_allignment'>
        <MuiThemeProvider>
          <div className='div_center_class div_position '>
            <br />
            <h5>Check Out</h5>

            <Row>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Address 1'
                  floatingLabelText='Address 1'
                  value={this.state.address1}
                  onChange={(event, newValue) =>
                    this.setState({ address1: newValue })
                  }
                />
              </Col>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Address 2'
                  floatingLabelText='Address 2'
                  value={this.state.address2}
                  onChange={(event, newValue) =>
                    this.setState({ address2: newValue })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your City'
                  floatingLabelText='City'
                  value={this.state.city}
                  onChange={(event, newValue) =>
                    this.setState({ city: newValue })
                  }
                />
              </Col>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Region'
                  floatingLabelText='Region'
                  value={this.state.region}
                  onChange={(event, newValue) =>
                    this.setState({ region: newValue })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Postal Code'
                  floatingLabelText='Postal Code'
                  value={this.state.postalCode}
                  onChange={(event, newValue) =>
                    this.setState({ postalCode: newValue })
                  }
                />
              </Col>
              <Col>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Country'
                  floatingLabelText='Country'
                  value={this.state.country}
                  onChange={(event, newValue) =>
                    this.setState({ country: newValue })
                  }
                />
              </Col>
            </Row>

            <Row>
              <Button variant='primary' type='submit' onClick={this.checkOut}>
                Place Order
              </Button>
            </Row>
          </div>
        </MuiThemeProvider>
      </Container>
    );
  }
}

const mapStoreToProps = store => {
  return {
    customer_id: store.rSignInSignUp.customer_id,
    customer: store.rSignInSignUp.customer,
    token: store.rSignInSignUp.token,
    order_id: store.rCheckOut.order_id
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    onPostOrder: data => dispatch({ type: 'postOrder', value: data }),
    onSetProductList: () => dispatch({ type: 'setProductList' })
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(CheckOut);

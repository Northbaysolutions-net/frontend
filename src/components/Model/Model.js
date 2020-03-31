import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import Cart from "../Cart/Cart";
import "../Model/Model.css";

class Model extends Component {
  constructor(props) {
    super(props);
    this.state= {
        show : false,
        totalProducts : 0
    }
  }
  handleClose = () =>
  {
      this.props.onSetShowModelFalse();
  }

  setTotalProducts = (total) =>
  {
    this.setState({totalProducts : total})
  }

  checkOut = () =>
  {
    this.handleClose();
    this.props.onSetCheckOut();

  }

  productsCount = ()=>
  {
    let cartVal = localStorage.getItem('Products');
    if(cartVal !== null )
    {
      if ( cartVal !== undefined)
      {
        if (cartVal.length > 0)
        {
          let totalLength = JSON.parse(cartVal).length ;
          if( totalLength >  0)
          if (this.state.totalProducts !== totalLength )
            this.setState({totalProducts : totalLength })
        } 
      }
    }
  }

  componentDidMount = () =>
  {
    this.productsCount();
  }

  componentDidUpdate() {
    this.productsCount();
  }


  render() {
    let {totalProducts} = this.state
      return (
          
          <div>
        <Modal show={this.props.ShowModel} onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
        { totalProducts > 0 ?  
        <Modal.Title>SHOPPING BAG (items:{totalProducts})</Modal.Title> :
        <Modal.Title>Empty Cart</Modal.Title> }
        </Modal.Header>
        <Modal.Body>
        { totalProducts > 0 ?  
        <Cart setTotalCount={this.setTotalProducts}/> :'' }
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          { totalProducts > 0 ?  
        <Button variant="primary" onClick={this.checkOut}>
        Check Out
      </Button> :'' }
          
        </Modal.Footer>
      </Modal>
    </div>
    )
  }};

  const mapStoreToProps = store => {
    return {
      ShowModel: store.rModel.ShowModel
    };
  };
  const mapDispatchTOProps = dispatch => {
    return {
      onSetShowModelFalse: () => dispatch({ type: "setShowModelFalse" }),
      onSetCheckOut: () => dispatch({ type: "setCheckOut" })
    };
  };
  
  export default connect(mapStoreToProps, mapDispatchTOProps)(Model);

import React from "react";
import { Modal, Button, Row, Col, Image} from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import './Cart.css'
import { updateCart } from '../../js/actions';
import {url_image} from '../../constants.js'

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    emptyChart = () => {
        return (
            <Modal
                size="lg"
                show={this.props.modal}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chart
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p>Empty Cart</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    increase = e =>{
        const {cart}=this.props;
        let index=parseInt(e.target.id);
        cart[index].quantity+=1;
        cart[index].total_price=(cart[index].quantity * cart[index].product.price).toFixed(2)
        this.props.updatecart(cart);
        this.forceUpdate();
    }
    decrease = e =>{
        const {cart}=this.props;
        let index=parseInt(e.target.id);
        if(cart[index].quantity>1){
        cart[index].quantity-=1;
        cart[index].total_price=(cart[index].quantity * cart[index].product.price).toFixed(2)
        this.props.updatecart(cart);
        this.forceUpdate();
        }
    }
    quantityInput =e =>{
        
    }
    removeProduct =e=>{
        const {cart}=this.props;
        let index=parseInt(e.target.id);
       cart.splice(index,1);
        this.props.updatecart(cart);
        this.forceUpdate();
    }
    render() {
        const { cart} = this.props;
        if (cart.length === 0) {
            return this.emptyChart();
        } else {
            let total=0.0;
            cart.map(ch=>{
                    total=total+parseFloat(ch.total_price);
        })
            return (
                <Modal
                   show={this.props.modal}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Chart
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <Row style={{border:"1px solid black", marginBottom:"1%"}} className="center">
                            <Col md={3}><h2>Item</h2></Col>
                            <Col md={2}><h2>Size</h2></Col>
                            <Col md={2}><h2>Color</h2></Col>
                            <Col md={3}><h2>Quantity</h2></Col>
                            <Col md={1}><h2>Price</h2></Col>
                        </Row>
                            {
                                cart.map((ch,i)=>(
                                    <Row className="center prod" key={ch.product_id}>
                                    <Col md={3}>
                                        <Row >
                                            <Col md={4}>
                                            <Image className="chart-img" src={`${url_image}${ch.product.image}`} />
                                            </Col>
                                            <Col md={8}>
                                            <h3 style={{marginLeft:"2%"}}>{ch.product.name}</h3>
                                            <Button variant="outline-danger" id={i} className="options" onClick={this.removeProduct}>Remove</Button>   
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={2} >
                                            <h3 >{ch.size}</h3>
                                    </Col>
                                    <Col md={2}>
                                            <h3 >{ch.color}</h3>
                                    </Col>
                                    <Col md={3}>
                                        <div className="center">
                                        <div className="input-group qa">
                                        <input type="button" id={i} value="-" className="button-minus qa" data-field="quantity" onClick={this.decrease} />
                                        <input type="number" id={i} step="1" value={ch.quantity} name="quantity" className="quantity-field" onChange={this.quantityInput}/>
                                        <input type="button" id={i} value="+" className="button-plus" data-field="quantity"  onClick={this.increase}/>
                                        </div>
                                        </div>
                                    </Col>
                                    <Col >
                                    <h3 className="price">${ch.total_price}</h3>
                                    </Col>
                                    </Row>
                                ))
                            }
                            <hr></hr>
                            <Row>
                            <Col md={3}><h2>Total</h2></Col>
                            <Col md={2}></Col>
                            <Col md={2}></Col>
                            <Col md={3}></Col>
                        <Col md={1}><h2 className="center">${total}</h2></Col>
                            </Row>

                     
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.props.close}>Close</Button>
                        <Link to="/checkout"><Button variant="success" onClick={this.props.close}>Checkout</Button></Link>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

}
const mapDispatchToProps = dispatch => {
    return {
        updatecart: payload => dispatch(updateCart(payload)),
        
    }
}
const mapStateToProps = state => {
    return { cart: state.cart, modal:state.modal }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))

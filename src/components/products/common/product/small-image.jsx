
import React, { Component } from 'react';
import Slider from 'react-slick';

class SmallImages extends Component {
    constructor (props) {
        super(props);
        this.state = {
            nav2: null
        }
    }
    componentDidMount() {
        this.setState({
            nav2: this.slider2
        });
    }

    render() {
        const { item, settings } = this.props;

        var productsnav = settings;

        return (
            <div className="row">
                <div className="col-12 p-0">
                    <Slider {...productsnav} asNavFor={this.props.navOne} ref={slider => (this.slider2 = slider)} className="slider-nav">
                       
                            <div key={item.image}>
                                <img src={'/assets/images/product_images/'.concat(item.image)} key={`c${item.image}`} alt=""  className="img-fluid" />
                            </div>
                        
                            
                                <div key={item.image_2}>
                                    <img src={'/assets/images/product_images/'.concat(item.image_2)} key={`d${item.image_2}`} alt=""  className="img-fluid" />
                                </div>
                        
                    </Slider>
                </div>
            </div>
        );
    }
}

export default SmallImages;
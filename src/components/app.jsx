import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header-one';


import FooterOne from "./common/footers/footer-one";





class App extends Component {

    render() {
        return (
            <div>
                <HeaderOne logoName={'logo.png'}/>
                {this.props.children}
                <FooterOne logoName={'logo.png'}/>

             

            </div>
        );
    }
}

export default withTranslate(App);

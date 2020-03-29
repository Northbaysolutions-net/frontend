import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { FOOTER_ITEMS } from '../../constants';

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          padding: 10,
          borderTop: '1px solid lightgray',
          height: 200,
          backgroundColor: '#f1f1f1',
          justifyContent: 'space-around',
          display: 'flex'
        }}
      >
        <div>
          <div
            style={{ color: '#504F5A', fontWeight: 'bold', marginBottom: 10 }}
          >
            QUESTIONS?
          </div>
          {FOOTER_ITEMS.questions.map(element => {
            return (
              <NavLink
                key={element.name}
                to={element.link}
                exact
                style={{
                  textDecoration: 'none',
                  color: 'rgb(32, 32, 34)'
                }}
                activeStyle={{
                  color: '#4282ad',
                  textDecoration: 'underline'
                }}
              >
                <div className='footerItem'>{element.name}</div>
              </NavLink>
            );
          })}
        </div>
        <div>
          <div
            style={{ color: '#504F5A', fontWeight: 'bold', marginBottom: 10 }}
          >
            WHAT'S IN STORE
          </div>
          {FOOTER_ITEMS.whatsInStore.map(element => {
            return (
              <NavLink
                key={element.name}
                to={element.link}
                exact
                style={{
                  textDecoration: 'none',
                  color: 'rgb(32, 32, 34)'
                }}
                activeStyle={{
                  color: '#4282ad',
                  textDecoration: 'underline'
                }}
              >
                <div className='footerItem'>{element.name}</div>
              </NavLink>
            );
          })}
        </div>
        <div>
          <div
            style={{ color: '#504F5A', fontWeight: 'bold', marginBottom: 10 }}
          >
            FOLLOW US
          </div>
          {FOOTER_ITEMS.followUs.map(element => {
            return (
              <a
                key={element.name}
                href={element.link}
                target='blank'
                style={{
                  textDecoration: 'none',
                  color: 'rgb(32, 32, 34)'
                }}
              >
                <div className='footerItem'>{element.name}</div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Footer;

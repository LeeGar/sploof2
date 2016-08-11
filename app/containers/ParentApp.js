import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class ParentApp extends Component {
  render() {

    return (
      <div className="parent-app-container">
        <h1> HELLO WORLD! </h1>
      </div>
    )

  }
}

function mapStateToProps(state, ownProps) {
  return {
    cart: ownProps.cart
  };
}

export default connect(mapStateToProps)(ParentApp);
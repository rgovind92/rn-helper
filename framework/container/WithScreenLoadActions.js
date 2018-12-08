import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
  *
  * @param {Component} Wrapped - The wrapped component
  * @param {Object} screenLoadActions - An array of functions to be excecuted on componentDidMount
  *
  * @return {Component}
  *
  */
export default (Wrapped, { screenLoadActions }) => {
  class Wrapper extends Component {
    render() {
      return <Wrapped {...this.props} />;
    }

    componentDidMount() {
      (screenLoadActions || []).map(action => {
        if (typeof action === 'function') {
          this.props.dispatch(action(this.props.logonAttributes));
        }
      });
    }
  }

  const mapStateToProps = state => ({
    logonAttributes: state.auth.logonAttributes
  });

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
  Connected.navigationOptions = Wrapped.navigationOptions;

  return Connected;
};

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Wrapped => {  
  class Wrapper extends Component {
    render() {
      return <Wrapped {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    childMenuItems: state.common.childMenuItems
  });

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
  Connected.navigationOptions = Wrapped.navigationOptions;

  return Connected;
};

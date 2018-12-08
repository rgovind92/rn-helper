import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (mapStateToProps, mapDispatchToProps) =>
  (Wrappee, { screenName }) => 
    connect(state => ({
      activeRoute: state.navigation.activeRoute,
      ...mapStateToProps(state)
    }),
    mapDispatchToProps)(class extends Component {
      render() {
        return <Wrappee {...this.props} />;
      }

      shouldComponentUpdate(nextProps) {
        return nextProps.activeRoute === screenName;
      }
    });
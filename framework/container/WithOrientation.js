import { Component } from 'react';
import { connect } from 'react-redux';

class WithOrientation extends Component {
  componentDidMount() {
    if (this.props.navigation) {
      this.props.navigation.setParams({
        orientation: this.props.orientation
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orientation !== this.props.orientation) {
      this.props.navigation.setParams({
        orientation: nextProps.orientation
      });
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  orientation: state.common.orientation
});

export default connect(mapStateToProps)(WithOrientation);

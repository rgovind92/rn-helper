import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IModal } from '../container';
import IText from './IText';
import IButton from './IButton';
import { modalDismissed } from '../actions';
import { noop } from '../util';

/* eslint-disable max-len */
/**
 *
 * @augments {Component<{isVisible: boolean, modalDismissed: Function, dismissable: boolean, text: string, yes: string, yesBackgroundColor: string, yesTextColor: string, no: string, noBackgroundColor: string, noTextColor: string, style: number}>}
 *
 */
class IDialog extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    modalDismissed: PropTypes.func,
    dismissable: PropTypes.bool,
    text: PropTypes.string,
    yes: PropTypes.string,
    yesBackgroundColor: PropTypes.string,
    yesTextColor: PropTypes.string,
    no: PropTypes.string,
    noBackgroundColor: PropTypes.string,
    noTextColor: PropTypes.string,
    style: PropTypes.any
  };

  render() {
    const {
      isVisible,

      dismissable = true,
      text = '',
      yes = 'OK',
      yesBackgroundColor,
      yesTextColor,
      no,
      noBackgroundColor,
      noTextColor,
      style,
      ...rest
    } = this.props;

    return (
      <IModal
        isVisible={isVisible}
        onBackdropPress={dismissable ? this.onNo : noop}
      >
        <View style={[styles.modal, style]}>
          <View style={styles.text}>
            <IText divider {...rest}>
              {text}
            </IText>
          </View>
          <View style={styles.buttonWrapper}>
            {no
              ?
              <IButton
                accent
                title={no}
                onPress={this.onNo}
                backgroundColor={noBackgroundColor}
                textColor={noTextColor}
                style={styles.noButton}
              />
              :
              null}
            <IButton
              title={yes}
              onPress={this.onYes}
              backgroundColor={yesBackgroundColor}
              textColor={yesTextColor}
              style={styles.yesButton}
            />
          </View>
        </View>
      </IModal>
    );
  }

  onYes = () => {
    this.props.modalDismissed();
    this.props.onYes && this.props.onYes();
  };

  onNo = () => {
    this.props.modalDismissed();
    this.props.onNo && this.props.onNo();
  };
}

const mapStateToProps = state => ({ ...state.common.modalProps });

const mapDispatchToProps = dispatch => ({
  modalDismissed: () => dispatch(modalDismissed())
});

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: 400,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: 16
  },
  buttonWrapper: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  yesButton: {
    width: 100
  },
  noButton: {
    width: 100,
    marginRight: 16
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IDialog);
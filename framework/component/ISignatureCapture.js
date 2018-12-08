import React, { Component } from 'react';
import SignatureCapture from 'react-native-signature-capture';

export default class ISignatureCapture extends Component{

  render() {
		
    return (
      <SignatureCapture>
				{ ...this.props}
				
      </SignatureCapture>
    );
	
  }


}
import React, { Component } from 'react';

const LocaleContext = React.createContext();

class LocaleProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocale: 'en-US',
      strings: props.strings,
      switchLocale: currentLocale => this.setState({ currentLocale })
    };
  }

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}

export { LocaleProvider };
export default LocaleContext;

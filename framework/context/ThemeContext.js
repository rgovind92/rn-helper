import React, { Component } from 'react';

const ThemeContext = React.createContext();

class ThemeProvider extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      ...props.colors,
      updateColor: (key, value) => {
        let o = {};
        o[key] = value;
        this.setState({
          ...o
        });
      },

      borderRadius: 0,
      updateBorderRadius: borderRadius => this.setState({ borderRadius })
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export { ThemeProvider };
export default ThemeContext;

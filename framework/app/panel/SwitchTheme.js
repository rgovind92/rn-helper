import React, { PureComponent, Component } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { memoize } from 'lodash';
import {
  IText
} from '../../component';
import { WithTheme, IModal } from '../../container';

const colors = [
  '#b71c1c',
  '#d32f2f',
  '#f44336',
  '#e57373',
  '#ffcdd2',

  '#880E4F',
  '#C2185B',
  '#E91E63',
  '#F06292',
  '#F8BBD0',

  '#4A148C',
  '#7B1FA2',
  '#9C27B0',
  '#BA68C8',
  '#E1BEE7',

  '#311B92',
  '#512DA8',
  '#673AB7',
  '#9575CD',
  '#D1C4E9',

  '#1A237E',
  '#303F9F',
  '#3F51B5',
  '#7986CB',
  '#C5CAE9',

  '#0D47A1',
  '#1976D2',
  '#2196F3',
  '#64B5F6',
  '#BBDEFB',

  '#01579B',
  '#0288D1',
  '#03A9F4',
  '#4FC3F7',
  '#B3E5FC',

  '#006064',
  '#0097A7',
  '#00BCD4',
  '#4DD0E1',
  '#B2EBF2',

  '#004D40',
  '#00796B',
  '#009688',
  '#4DB6AC',
  '#B2DFDB',

  '#1B5E20',
  '#388E3C',
  '#4CAF50',
  '#81C784',
  '#C8E6C9',

  '#33691E',
  '#689F38',
  '#8BC34A',
  '#AED581',
  '#DCEDC8',

  '#827717',
  '#AFB42B',
  '#CDDC39',
  '#DCE775',
  '#F0F4C3',

  '#F57F17',
  '#FBC02D',
  '#FFEB3B',
  '#FFF176',
  '#FFF9C4',

  '#FF6F00',
  '#FFA000',
  '#FFC107',
  '#FFD54F',
  '#FFECB3',

  '#E65100',
  '#F57C00',
  '#FF9800',
  '#FFB74D',
  '#FFE0B2',

  '#BF360C',
  '#E64A19',
  '#FF5722',
  '#FF8A65',
  '#FFCCBC',

  '#3E2723',
  '#5D4037',
  '#795548',
  '#A1887F',
  '#D7CCC8',

  '#212121',
  '#616161',
  '#9E9E9E',
  '#E0E0E0',
  '#F5F5F5',

  '#263238',
  '#455A64',
  '#607D8B',
  '#90A4AE',
  '#CFD8DC'
];

const DividerText = props => <IText divider {...props} />;

export default class extends Component {
  static navigationOptions = {
    headerTitle: 'Switch Theme'
  };

  state = {
    inputValue: 'Primary',
    radioButtonValue: true,
    checkboxValue: true,
    switchValue: true
  };

  render() {
    return (
      <WithTheme>
        {theme => (
          <View style={styles.full}>
            <ColorPicker context={theme} />
          </View>
        )}
      </WithTheme>
    );
  }
}

/* <Flex justifyCenter alignCenter style={{ marginBottom: 32 }}>
          <DividerText>Preview</DividerText>
        </Flex>
        <Flex row alignCenter justifyAround>
          <IButton title='Primary' />
          <IButton title='Secondary' secondary />
          <IButton title='Accent' accent />
          <IButton title='Disabled' disabled />
        </Flex>
        <Flex row alignCenter style={{ marginTop: 16, marginLeft: 16 }}>
          <ITextInput
            placeholder='Enter'
            value={this.state.inputValue}
            onChangeText={inputValue => this.setState({ inputValue })}
          />
          <ICheckbox
            style={{ marginLeft: 16, marginRight: 16 }}
            value={this.state.checkboxValue}
            onValueChange={checkboxValue => this.setState({ checkboxValue })}
          />
          <IRadioButton
            style={{ marginLeft: 16 }}
            value={this.state.radioButtonValue}
            onValueChange={radioButtonValue =>
              this.setState({ radioButtonValue })
            }
          />
          <ISwitch
            style={{ marginLeft: 16 }}
            value={this.state.switchValue}
            onValueChange={switchValue => this.setState({ switchValue })}
            positiveText='Yes'
            negativeText='No'
          />
        </Flex>
        <Flex row alignCenter style={{ marginTop: 16, marginLeft: 16 }} /> */


// TODO : Write StyleSheets for this
class ColorPicker extends Component {
  state = {
    colorKey: null,
    isModalVisible: false
  };

  showColorPicker = colorKey => {
    this.setState({
      colorKey,
      isModalVisible: true
    });
  };

  updateColor = (context, value) => {
    this.setState({
      isModalVisible: false
    });
    context.updateColor(this.state.colorKey, value);
  };

  render() {
    const {
      context: {
        primary,
        primaryText,
        secondary,
        secondaryText,
        accent,
        accentText,
        divider,
        dividerText
      }
    } = this.props;
  
    return (
      <View style={styles.full}>
        <View style={styles.row}>
          <View style={styles.column}>
            <DividerText style={{ width: 100 }}>Primary: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'primary')}>
              <View
                style={{
                  backgroundColor: primary,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <DividerText>Primary text: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'primaryText')}>
              <View
                style={{
                  backgroundColor: primaryText,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <DividerText style={{ width: 100 }}>Secondary: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'secondary')}>
              <View
                style={{
                  backgroundColor: secondary,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <DividerText>Secondary text: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'secondaryText')}>
              <View
                style={{
                  backgroundColor: secondaryText,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <DividerText style={{ width: 100 }}>Accent: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'accent')}>
              <View
                style={{
                  backgroundColor: accent,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <DividerText>Accent text: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'accentText')}>
              <View
                style={{
                  backgroundColor: accentText,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <DividerText style={{ width: 100 }}>Divider: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'divider')}>
              <View
                style={{
                  backgroundColor: divider,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <DividerText>Divider text: </DividerText>
            <TouchableOpacity onPress={this.showColorPicker.bind(null, 'dividerText')}>
              <View
                style={{
                  backgroundColor: dividerText,
                  width: 50,
                  height: 50,
                  marginLeft: 32
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <IModal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={styles.modal}
        >
          <FlatList
            contentContainerStyle={styles.list}
            numColumns={5}
            keyExtractor={(_, index) => '' + index}
            data={colors}
            renderItem={({ item }) => (
              <ColorItem
                color={item}
                onSelectColor={this.updateColor.bind(null, this.props.context, item)}
              />
            )}
          />
        </IModal>
      </View>
    );
  }
}

// TODO: Rendering all colors at once is slightly laggy. Could this be streamed / lazy rendered?
class ColorItem extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={getItemStyle(this.props.color)}
        onPress={this.props.onSelectColor}
      />
    );
  }
}

const getItemStyle = memoize(backgroundColor => StyleSheet.create({
  o: {
    width: 50,
    height: 50,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor
  }
}).o);

const styles = StyleSheet.create({
  list: {
    paddingLeft: 8,
    paddingTop: 8
  },
  full: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modal: {
    width: 300,
    height: 300
  }
});

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {  TouchableOpacity, Animated } from 'react-native';

import { COLORS, SIZES } from '../constants';



const CustomCheckBox = ({
  isChecked,
  customContainerStyle,
  customCheckboxStyle,
  renderText,
  onPress,
}) => {
  const stateAnimated = React.useRef(new Animated.Value(0)).current;
  const [checked, setChecked] = React.useState(isChecked || false);

  const handleOnPress = () => {
    setChecked(!checked);
    onPress(!checked)
    // !onPress && onPress(!checked);
  };

  React.useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  React.useEffect(() => {
    Animated.timing(stateAnimated, {
      toValue: checked ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  const scale = stateAnimated.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.85, 1],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleOnPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...customContainerStyle,
      }}>
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 18,
          height: 18,
          backgroundColor: checked ? COLORS.primary : COLORS.white,
          borderWidth: checked ? 0 : 2.5,
          borderColor: COLORS.gray,
          borderRadius: SIZES.radius * 0.5,
          transform: [{ scale }],
          ...customCheckboxStyle,
        }}>
        {checked && (
          <Svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <Path
              d="M3.99993 7.80007L1.19993 5.00007L0.266602 5.9334L3.99993 9.66673L11.9999 1.66673L11.0666 0.733398L3.99993 7.80007Z"
              fill="white"
            />
          </Svg>
        )}
      </Animated.View>
      {typeof renderText === 'function' && renderText()}
    </TouchableOpacity>
  );
};

export default CustomCheckBox;

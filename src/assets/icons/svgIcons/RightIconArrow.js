import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

const RightIconArrow = ({ color = '#68213D', style }) => {
  return (
    <View style={style}>
      <Svg width="13" height="9" viewBox="0 0 14 10">
        <Path
          d="M9.00016 0.333374L8.06016 1.27337L11.1135 4.33337H0.333496V5.66671H11.1135L8.0535 8.72671L9.00016 9.66671L13.6668 5.00004L9.00016 0.333374Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default RightIconArrow;

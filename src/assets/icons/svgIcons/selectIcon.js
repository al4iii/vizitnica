import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SelectIcon = ({ color, width = '18', height = '18' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 14">
      <Path
        d="M6.00039 11.2L1.80039 6.99997L0.400391 8.39997L6.00039 14L18.0004 1.99998L16.6004 0.599976L6.00039 11.2Z"
        fill={color}
      />
    </Svg>
  );
};

export default SelectIcon;

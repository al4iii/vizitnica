import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowBack = ({ color = '#38B8E0' }) => {
  return (
    <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
      <Path
        d="M11.67 1.86998L9.9 0.0999756L0 9.99998L9.9 19.9L11.67 18.13L3.54 9.99998L11.67 1.86998Z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowBack;

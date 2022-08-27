import React from 'react';
import Svg, { Path } from 'react-native-svg';

const RightIconButton = ({ color }) => {
  return (
    <Svg width="8" height="12" viewBox="0 0 8 12">
      <Path
        d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z"
        fill={color}
      />
    </Svg>
  );
};

export default RightIconButton;

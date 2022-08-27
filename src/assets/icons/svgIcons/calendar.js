import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Phone = ({ color = '#38B8E0' }) => {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <Path
        d="M9 20H2C0.89 20 0 19.1 0 18L0.00999999 4C0.00999999 2.9 0.89 2 2 2H3V0H5V2H13V0H15V2H16C17.1 2 18 2.9 18 4V10H16V8H2V18H9V20ZM19.13 14.99L19.84 14.28C20.23 13.89 20.23 13.26 19.84 12.87L19.13 12.16C18.74 11.77 18.11 11.77 17.72 12.16L17.01 12.87L19.13 14.99ZM18.42 15.7L13.12 21H11V18.88L16.3 13.58L18.42 15.7Z"
        fill={color}
      />
    </Svg>
  );
};

export default Phone;

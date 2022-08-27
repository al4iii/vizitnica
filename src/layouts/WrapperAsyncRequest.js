import React from 'react';
import { ActivityIndicator } from 'react-native';

import { APIStatus } from '../lib/axiosAPI';

const WrapperAsyncRequest = ({ children, status }) => {
  return status === APIStatus.Loading ? (
    <>
      <ActivityIndicator style={{flex: 1}} size="large" color="#38B8E0" />
    </>
  ) : (
    <>{children}</>
  );
};

export default WrapperAsyncRequest;

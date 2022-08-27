import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';

import { SIZES } from '../constants';


const MainLayouts = ({ children, scroll, customContainerStyle }) => {
  function renderContent() {
    return (
      <>
        <View
          style={{
            paddingTop: SIZES.padding * 1.6,
            ...customContainerStyle
          }}
        />
        {children}
        <View
          style={{
            paddingBottom: SIZES.padding * 1.6,
            ...customContainerStyle
          }}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {scroll ? (
        <ScrollView style={{ flex: 1, ...customContainerStyle }}>
          {renderContent()}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, ...customContainerStyle }}>
          {renderContent()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainLayouts;

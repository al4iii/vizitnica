import React from 'react';
import { View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import ClearButton from '../assets/icons/svgIcons/clearButton';
import Icons from '../assets/icons/svgIcons/Icons';
import { COLORS, SIZES } from '../constants';

const SearchInput = ({customContainerStyle, selectionColor = COLORS.primary, placeholder = 'Поиск', getInputData, withClearButton = false, onClear, width = '100%' }) => {
  const [inputVal, setInputVal] = React.useState('');

  const handleClearInput = () => {
    setInputVal('');
    if (typeof onClear === 'function') {
      onClear();
    }
  };

  React.useEffect(() => {
    let id = setTimeout(() => {
      typeof getInputData === 'function' && getInputData(inputVal);
    }, 200);
    return () => {
      clearTimeout(id);
    };
  }, [inputVal]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: SIZES.padding * 0.8,
        width,
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        ...customContainerStyle,
      }}>
      <View
        style={{
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 16,
          right: 0,
          bottom: 0,
        }}>
        <Icons.Search color={COLORS.grayLight} />
      </View>
      <TextInput
        value={inputVal}
        onChangeText={val => setInputVal(val)}
        placeholder={placeholder}
        multiline={false}
        width={Dimensions.get('window').width - SIZES.padding * 3}
        autoCorrect={false}
        selectionColor={selectionColor}
        onFocus={() => {}}
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding * 4.0,
          color: COLORS.black,
        }}
      />

      {withClearButton && (
        <TouchableOpacity
          onPress={handleClearInput}
          style={{ paddingHorizontal: 16 }}>
          <ClearButton />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(SearchInput);

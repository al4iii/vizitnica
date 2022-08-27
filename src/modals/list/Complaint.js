import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Hr, RadioButton } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { useSendComplaint } from '../../screens/hooks/useSendComplaint';

const Complaint = ({ item }) => {
  const [chooseItem, setChooseItem] = React.useState(null);
  const complaints = useSelector(state => state.verification.complaints);
  const { fetch } = useSendComplaint();
  const { id, card } = item;

  function Item({ item }) {
    return (
      <View style={{ marginLeft: 18 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 24,
            paddingVertical: 19,
          }}
          onPress={() => setChooseItem(item.name)}>
          <RadioButton
            isTrue={chooseItem === item.name ? true : false}
            color={card?.buttonsColor}
          />
          <Text
            style={{
              ...FONTS.body1,
              color: COLORS.textBlack,
              paddingRight: 18,
            }}>
            {item.value}
          </Text>
        </TouchableOpacity>
        <Hr />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={card?.gradientColor}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1, alignSelf: 'space-between' }}>
        <FlatList
          data={complaints}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.name}
        />
      </View>
      <TouchableOpacity
        disabled={chooseItem === null ? true : false}
        onPress={() => fetch(id, chooseItem)}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 56,
          borderRadius: 100,
          backgroundColor: card?.buttonsColor,
          opacity: chooseItem ? 1 : 0.7,
          marginHorizontal: SIZES.margin,
          padding: SIZES.padding1,
        }}>
        <Text style={{ color: card?.textColor, ...FONTS.h3 }}>
          {'Отправить жалобу'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Complaint;

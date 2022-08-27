import React from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { SearchInput } from '../../components';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { COLORS, FONTS, SIZES } from '../../constants';

const Countries = ({ toggleModal }) => {
  const { countries = [] } = useSelector(state => state.verification);
  const { updateSelectedCountry } = verificationActionCreators();

  const [data, setData] = React.useState(countries);

  const requestSearch = React.useCallback(value => {
    const newData = countries.filter(
      country =>
        (country.name + country.code)
          .toUpperCase()
          .indexOf(value.toUpperCase()) > -1,
    );
    setData(newData);
  }, []);

  const handleSelectCountry = country => {
    updateSelectedCountry({ code: country.code, flag: country.flag });
    toggleModal(false);
  };

  React.useEffect(() => {
    setData(countries);
  }, [countries]);

  function renderCountry({ item }) {
    return (
      <View
        style={{
          paddingTop: SIZES.padding,
          width: Dimensions.get('window').width - SIZES.padding * 3,
        }}>
        <TouchableOpacity
          key={item.name}
          onPress={() => handleSelectCountry(item)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.padding * 1.6,
          }}>
          <Image
            source={{ uri: item.flag }}
            style={{
              width: 28,
              height: 18,
              marginRight: SIZES.padding * 2.2,
            }}
            resizeMode="cover"
          />
          <Text style={{ ...FONTS.body1, flex: 1, color: COLORS.black }}>
            {item.name}
          </Text>
          <Text style={{ ...FONTS.body1, color: COLORS.black, marginRight: 4 }}>
            {item.code}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <SearchInput
        getInputData={requestSearch}
        placeholder={'Поиск страны'}
        customContainerStyle={{ marginBottom: 24 }}
      />
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        keyExtractor={item => item.name}
        renderItem={renderCountry}
        scrollEnable={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ ...FONTS.body1, color: COLORS.gray }}>
              Ничего не найдено!
            </Text>
          </View>
        )}
      />
    </>
  );
};

export default Countries;

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import { FONTS, COLORS, api } from '../../constants';
import { YaMap, Marker, Geocoder } from 'react-native-yamap';
import RNLocation from 'react-native-location';
import Plus from '../../assets/icons/svgIcons/plus';
import Minus from '../../assets/icons/svgIcons/minus';
import Location from '../../assets/icons/svgIcons/location';
import point from '../../assets/icons/point.png';

YaMap.init(api.map_key);
YaMap.setLocale('ru_RU');
Geocoder.init(api.geocoder_key);

const Map = ({ navigation, route }) => {
  const infoSpecialist = route.params.infoSpecialist;

  const map = React.useRef(null);
  const lat = +infoSpecialist.coordinates.latitude;
  const lon = +infoSpecialist.coordinates.longitude;
  const marker = { lat: lat, lon: lon };
  const [zoom, setZoom] = React.useState(14);
  const [coor, setCoor] = React.useState({ lat: lat, lon: lon });

  const myLocation = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      latestLocation &&
        setCoor({
          lat: latestLocation.latitude,
          lon: latestLocation.longitude,
        });
    });
  };

  const MarkerCoor = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      latestLocation &&
        setCoor({
          lat: lat,
          lon: lon,
        });
    });
  };

  React.useEffect(() => {
    map?.current?.setZoom(zoom, 0, 3);
  }, [zoom]);

  React.useEffect(() => {
    map?.current?.setCenter(coor, zoom, 0, 0, 1);
  }, [coor]);

  React.useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      if (granted) {
        MarkerCoor();
      }
      err => {
        console.log(err);
      };
    });
  }, []);

  const ButtonMap = ({ top, onPress, icons, imageW, imageH }) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: top,
          zIndex: 1,
          right: 16,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginBottom: 16,
          }}
          onPress={onPress}>
          {icons}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle={'light-content'}
      />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flex: 0.1,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 16, margin: -10 }}>
              <Icons.ArrowBack color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -50,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.textBlack,
                fontWeight: '600',
                textAlign: 'center',
                marginVertical: 12,
              }}>
              {'Карта'}
            </Text>
          </View>

          {/* <TouchableOpacity>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.textBlack,
              lineHeight: 10,
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: COLORS.textBlack,
            }}>
            {'Убрать маршрут'}
          </Text>
        </TouchableOpacity> */}
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.lightGray,
          }}>
          <YaMap
            ref={map}
            style={{
              flex: 1,
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            showUserPosition>
            {marker && <Marker point={marker} source={point} scale={1} />}
          </YaMap>
          <ButtonMap
            top={'40%'}
            icons={<Location />}
            imageW={22}
            imageH={22}
            onPress={() => myLocation()}
          />
          <ButtonMap
            top={'50%'}
            icons={<Plus color={'#787880'} />}
            onPress={() => setZoom(zoom + 1)}
            imageW={14}
            imageH={14}
          />
          <ButtonMap
            top={'60%'}
            icons={<Minus />}
            onPress={() => setZoom(zoom - 1)}
            imageW={14}
            imageH={2}
          />
        </View>
      </View>
    </>
  );
};

export default Map;

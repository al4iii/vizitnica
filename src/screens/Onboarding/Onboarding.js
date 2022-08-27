import React from 'react';
import { View, FlatList, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons/svgIcons/Icons';
import { verificationActionCreators } from '../../slices/verificationSlice';
import OnboardingItems from './OnboardingItems';
import { TextButton } from '../../components';
import MainLayouts from '../../layouts/MainLayouts';
import { COLORS, SIZES, FONTS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    id: '1',
    title: 'Быстрая запись на услуги',
    description:
      'Сохраняйте визитких любимых специалистов \n и записывайтесь на услуги',
    textButton: 'Дальше',
    SvgComponent: Icons.OnBoarding1,
  },
  {
    id: '2',
    title: 'Общение в чате',
    description:
      'Договаривайтесь о новом визите к \n специалисту в чате не выходя из приложения',
    textButton: 'Всё понятно',
    SvgComponent: Icons.OnBoarding2,
  },
];

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const onboarding = React.useRef(null);
  const scrollX = new Animated.Value(0);
  const { setToken } = verificationActionCreators();
  const token = useSelector(state => state.verification.token);

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentSlideIndex(viewableItems[0].index);
  }).current;

  const viewConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 5,
  }).current;

  const scrollTo = () => {
    if (currentSlideIndex < slides.length - 1) {
      onboarding.current.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      if (AsyncStorage.getItem('token')) {
        console.log(AsyncStorage.getItem('token'), 'async storage');
        navigation.navigate('EnterPhoneStep');
      }
    }
  };

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
  };

  getData();

  React.useEffect(() => {
    if (token) {
      navigation.navigate('CreateBusinessCard');
    }
  }, [token]);

  function renderPagination() {
    const slideIndex = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.padding * -0.6,
        }}>
        {slides.map((item, i) => {
          const opacity = slideIndex.interpolate({
            inputRange: [i - 1, i, i],
            outputRange: [0.25, 1, 0.25],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={item.id}
              style={{
                flex: 1,
                marginHorizontal: SIZES.padding * 0.8,
                height: 4,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius * 12.5,
                opacity: opacity,
              }}
            />
          );
        })}
      </View>
    );
  }

  return (
    <LinearGradient colors={['#45BAE1', '#0F98C2']} style={{ flex: 1 }}>
      <MainLayouts>
        {renderPagination()}
        <FlatList
          ref={onboarding}
          data={slides}
          renderItem={({ item }) => <OnboardingItems {...item} />}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        />
        <TextButton
          label={
            currentSlideIndex === slides.length - 1 ? 'Всё понятно' : 'Дальше'
          }
          customContainerStyle={{
            backgroundColor: COLORS.white,
            marginHorizontal: SIZES.padding * 1.6,
          }}
          customLabelStyle={{ color: COLORS.primary }}
          onPress={() => scrollTo()}
        />

        <TextButton
          label={currentSlideIndex !== slides.length - 1 ? 'Пропустить' : null}
          customContainerStyle={{ padding: 0, marginTop: SIZES.padding * 1.6 }}
          customLabelStyle={{ color: COLORS.white, ...FONTS.body3 }}
          onPress={() => navigation.navigate('EnterPhoneStep')}
        />
      </MainLayouts>
    </LinearGradient>
  );
};

export default Onboarding;

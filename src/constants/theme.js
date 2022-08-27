import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    // base colors
    primary: "#38B8E0",
    secondary: "#F1FAFD",

    // colors
    grayLight: "#D4D4D4",
    grayLight2: "#E5E5E5",
    black: "#1E1F20",
    blackText: "#353535",
    white: "#FFFFFF",
    gray: "#787880",
    red: "#D64641",
    bright_cyan: "#F0F2F4",
    textGray: "#787880",
    textBlack: '#1C1C1E',
    backgroundPicker: '#dfdfdf',
    confirm: '#52AA63',

    green: '#55B468',
    blue: '#007AFF',
    placeholder: "#ACACB7",

    lightGray: "#EAECEE",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    lightGray5: "#F5F7F8",
    lightGray6: "#3F3F3F",
    lightGray7: "#F8F8F8",
    transparent: "transparent",
    darkgray: '#898C95',
    brown: '#301F05'
};

export const SIZES = {
    // global sizes
    radius: 8,
    padding: 10,
    padding1: 16,
    padding2: 12,
    margin: 16,


    // font sizes
    largeTitle: 50,
    h1: 25,
    h2: 20,
    h3: 17,
    h4: 15,
    h5: 11,

    body1: 15,
    body2: 14,
    body3: 12,
    body4: 11,
    body5: 10,
    body6: 13,
    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: 'SFProDisplay-Black', fontSize: SIZES.h1, lineHeight: 29.83 },
    h2: { fontFamily: 'SFProDisplay-Black', fontSize: SIZES.h2, lineHeight: 22 },
    h3: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h3, lineHeight: 20.29 },
    h4: { fontFamily: 'SFProDisplay-Semibold', fontSize: SIZES.h4, lineHeight: 17.9 },
    h5: { fontFamily: 'SFProDisplay-Semibold', fontSize: SIZES.body6, lineHeight: 18 },
    body1: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body1, lineHeight: 17.9 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body3, lineHeight: 16 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body5, lineHeight: 16 },
    body6: { fontFamily: 'SFProDisplay-Medium', fontSize: SIZES.body4, lineHeight: 14 },
    body7: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.h5, lineHeight: 16 },
    body8: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body2 - 1, lineHeight: 18 },
    body9: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h3, lineHeight: 22 },
    body10: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h4, lineHeight: 17.9 },
    body11: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body3, lineHeight: 14 },
    body12: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.h2 + 3, lineHeight: 27 },
    body13: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.h2 - 2, lineHeight: 22.67 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

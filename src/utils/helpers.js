import { Platform, Dimensions, StatusBar, PixelRatio } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const androidNotchHeight =
  isAndroid && StatusBar.currentHeight > 24 ? StatusBar.currentHeight : 0;

export const uniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);

export const roundPixel = size => PixelRatio.roundToNearestPixel(size);

const guideline = {
  width: 375,
  height: 812,
};

const { width, height } = Dimensions.get('window');

const scaleByWidth = size => roundPixel((size / guideline.width) * width);
const scaleByWidthPercent = size => `${(size * 100) / guideline.width}%`;
const scaleByHeightPercent = size => `${(size * 100) / guideline.height}%`;
const scaleByHeight = size => roundPixel((size / guideline.height) * height);

export {
  scaleByHeight as sv,
  scaleByWidth as s,
  scaleByWidthPercent as swp,
  scaleByHeightPercent as shp,
};

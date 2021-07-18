import {StyleSheet} from 'react-native';

import {colors} from '.';
import {contentPadding, paddingLarge, paddingXLarge} from './sizes';

export const sharedStyles = StyleSheet.create({
  absolute: {position: 'absolute'},
  absoluteFill: StyleSheet.absoluteFillObject,
  relative: {position: 'relative'},
  flex: {flex: 1},
  flexGrow: {flexGrow: 1},
  flexNoGrow: {flexGrow: 0},
  flexWrap: {flexWrap: 'wrap'},
  flexNoWrap: {flexWrap: 'nowrap'},
  horizontal: {flexDirection: 'row'},
  horizontalReverse: {flexDirection: 'row-reverse'},
  vertical: {flexDirection: 'column'},
  verticalReverse: {flexDirection: 'column-reverse'},
  alignItemsCenter: {alignItems: 'center'},
  alignItemsFlexEnd: {alignItems: 'flex-end'},
  alignItemsFlexStart: {alignItems: 'flex-start'},
  alignSelfCenter: {alignSelf: 'center'},
  alignSelfFlexEnd: {alignSelf: 'flex-end'},
  alignSelfFlexStart: {alignSelf: 'flex-start'},
  alignSelfStretch: {alignSelf: 'stretch'},
  displayFlex: {display: 'flex'},
  displayNone: {display: 'none'},
  fullHeight: {height: '100%'},
  fullMinWidth: {minWidth: '100%'},
  fullMaxWidth: {maxWidth: '100%'},
  fullWidth: {width: '100%'},
  justifyContentCenter: {justifyContent: 'center'},
  justifyContentFlexEnd: {justifyContent: 'flex-end'},
  justifyContentFlexStart: {justifyContent: 'flex-start'},
  justifyContentSpaceBetween: {justifyContent: 'space-between'},
  justifyContentSpaceEvenly: {justifyContent: 'space-evenly'},
  margin: {margin: contentPadding},
  marginHalf: {margin: contentPadding / 2},
  marginHorizontal: {marginHorizontal: contentPadding},
  marginHorizontalHalf: {marginHorizontal: contentPadding / 2},
  marginVertical: {marginVertical: contentPadding},
  marginVerticalHalf: {marginVertical: contentPadding / 2},
  opacity0: {opacity: 0},
  opacity100: {opacity: 1},
  overflowHidden: {overflow: 'hidden'},
  overflowVisible: {overflow: 'visible'},
  padding: {padding: contentPadding},
  paddingHalf: {padding: contentPadding / 2},
  paddingHorizontal: {paddingHorizontal: contentPadding},
  paddingHorizontalHalf: {paddingHorizontal: contentPadding / 2},
  paddingVertical: {paddingVertical: contentPadding},
  paddingVerticalHalf: {paddingVertical: contentPadding / 2},
  paddingLarge: {padding: paddingLarge},
  paddingXLarge: {padding: paddingXLarge},
  textCenter: {textAlign: 'center'},

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGray,
  },
  verticalSeparator: {
    height: '100%',
    width: 1,
    backgroundColor: colors.lightGray,
  },

  lightContent: {
    backgroundColor: colors.secondary,
  },

  center: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  screen: {
    backgroundColor: colors.contentBackground,
  },

  horizontalAndVerticallyAligned: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});

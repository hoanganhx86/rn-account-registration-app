import {UIManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(false);

export default {
  // monitor api status on the console
  enabledApiLogger: false,
};

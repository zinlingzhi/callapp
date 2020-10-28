/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true; 
console.ignoredYellowBox = ['Warning:', 'Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent(appName, () => App);

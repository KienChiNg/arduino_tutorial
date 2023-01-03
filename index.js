/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Display from './Src/display'
import navigator from './Src/navigator'

AppRegistry.registerComponent(appName, () =>navigator);

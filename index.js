import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// NOTE: This is a fix for RN60 breaking `fetch`
global.Blob = null

AppRegistry.registerComponent(appName, () => App);

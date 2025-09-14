// index.js
import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler'; // ✅ required before any navigation imports
import { LogBox } from 'react-native';
import App from './App';

// Optional: Ignore specific non‑critical warnings
LogBox.ignoreLogs([
  'Warning: ...', // add any known harmless warnings here
]);

// Optional: Global error handler (dev mode)
if (__DEV__) {
  const errorHandler = (e, isFatal) => {
    console.error(isFatal ? 'Fatal:' : 'Error:', e);
  };
  // eslint-disable-next-line no-undef
  ErrorUtils.setGlobalHandler(errorHandler);
}

// ✅ This ensures the app runs in Expo Go or a native build
registerRootComponent(App);
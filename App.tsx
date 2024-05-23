import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/app/store';
import { RootTabs } from './src/presentation/navigator/RootTabs';

const App = () => {
  return (
    <NavigationContainer>
      <RootTabs />
    </NavigationContainer>
  );
};

const MainApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default MainApp;

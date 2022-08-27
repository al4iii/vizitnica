import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { Route } from './src/routes/Route';
import { store } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastProvider } from 'react-native-toast-notifications';
import LoadingToast from './src/components/LoadingToast';
import { useNetInfo } from '@react-native-community/netinfo';
import ModalsNoInternet from './src/modals/ModalsNoInternet';

LogBox.ignoreAllLogs(); //Ignore all log notifications

export const storeData = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.log(e, 'error storage');
  }
};

const App = ({ navigation }) => {
  const netInfo = useNetInfo();
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    if (netInfo.type === 'none' && netInfo.isConnected === false) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [netInfo]);

  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <ToastProvider
          renderType={{
            custom_type: toast => (
              <LoadingToast message={toast.message} onPress={toast.onPress} />
            ),
          }}>
          <Route />
          <ModalsNoInternet
            visibleModal={openModal}
            setVisibleModal={setOpenModal}
            navigation={navigation}
          />
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

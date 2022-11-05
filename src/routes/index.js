import {View, Text, ActivityIndicator} from 'react-native';
import {useAuth} from '../contexts/auth';

import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';

export function Routes() {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#36393F',
        }}>
        <ActivityIndicator size={50} color="#E52246" />
      </View>
    );
  }

  return !signed ? <AppRoutes /> : <AuthRoutes />;
}

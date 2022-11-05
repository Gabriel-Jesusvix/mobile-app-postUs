import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import {Routes} from './src/routes';
import {theme} from './src/global/theme';
import {AuthProvider} from './src/contexts/auth';

export function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#36393F"
        barStyle="light-content"
        translucent={false}
      />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

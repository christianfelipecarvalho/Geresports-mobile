import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Routes from './src/routes/index.js';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar  backgroundColor='#000' barStyle='light-content' />
      <Routes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
 
});

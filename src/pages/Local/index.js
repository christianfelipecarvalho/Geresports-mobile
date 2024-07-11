import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import imagemEmConstrucao from '../../assets/em-construcao.png';
export default function Local() {
  return (
    <View style={styles.container} >
      <Image source={ imagemEmConstrucao} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
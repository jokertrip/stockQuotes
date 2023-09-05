import { Button, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '../navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const AboutScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'About'>>()

  return (
    <View style={styles.container}>
      <Button title="Перейти к котировкам" onPress={() => navigation.navigate('Quotes')} />
    </View>
  )
}

export default AboutScreen

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AboutScreen from '../screens/AboutScreen'
import QuotesScreen from '../screens/QuotesScreen'

export type RootTabParamList = {
  About: undefined
  Quotes: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarIconStyle: { display: 'none' }, tabBarLabelStyle: { fontSize: 20, marginBottom: 10 } }}
      >
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'О компании' }} />
        <Tab.Screen name="Quotes" component={QuotesScreen} options={{ title: 'Котировки' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

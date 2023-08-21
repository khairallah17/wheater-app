import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerShown={false}
      >
        <Stack.Screen name="Home" options={{
          headerShown: false
        }} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
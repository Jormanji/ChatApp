import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Homescreen from "./screens/Homescreen";
import Chatscreen from "./screens/Chatscreen";
import Messagescreen from "./screens/Messagescreen"

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalState from "./context";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homescreen" component={Homescreen}/>
          <Stack.Screen name="Chatscreen" component={Chatscreen}/>
          <Stack.Screen name="Messagescreen" component={Messagescreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </GlobalState>
  );
}

export default App;
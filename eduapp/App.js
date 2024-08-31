import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Toast from "react-native-toast-message";
import HomeScreen from "./screens/HomeScreen";
import CourseDetail from "./screens/CourseDetail";
import { MenuProvider } from "react-native-popup-menu";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MenuProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CourseDetail" component={CourseDetail} />
        </Stack.Navigator>
        <Toast />
      </MenuProvider>
    </NavigationContainer>
  );
}

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CourseDetail from "./screens/CourseDetail";
import ProfileScreen from "./screens/ProfileScreen";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import CoursesScreen from "./screens/CoursesScreen";
import useAuthStore from "./store/useAuthStore";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const { userInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
  }));
  console.log("🚀 ~ const{userInfo}=useAuthStore ~ userInfo:", userInfo);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{ headerShown: false }}
      />
      {userInfo.fullname && (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MenuProvider>
        <Stack.Navigator initialRouteName="Main">
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
            name="Main"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CourseDetail" component={CourseDetail} />
        </Stack.Navigator>
        <Toast />
      </MenuProvider>
    </NavigationContainer>
  );
}

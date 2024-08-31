import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          fullname,
          password,
          username,
        }
      );

      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });

      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error);

      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Image
        source={require("../assets/images/signup-img.png")}
        style={{ width: "100%", height: 500, marginTop: -65 }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          zIndex: 100,
        }}
      ></View>
      <View
        style={{
          padding: 10,
          width: "100%",
          marginTop: -100,
          marginHorizontal: "auto",
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>
          Register
        </Text>
        <View
          style={{
            marginVertical: 5,
            width: "80%",
            marginHorizontal: "auto",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Fullname
            </Text>
            <TextInput
              style={{
                padding: 4,
                height: 50,
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                paddingHorizontal: 15,
                fontSize: 16,
              }}
              placeholder="Fullname"
              value={fullname}
              onChangeText={setFullname}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Username
            </Text>
            <TextInput
              style={{
                padding: 4,
                height: 50,
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                paddingHorizontal: 15,
                fontSize: 16,
              }}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                padding: 4,
                height: 50,
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                paddingHorizontal: 15,
                fontSize: 16,
              }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                padding: 4,
                height: 50,
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                paddingHorizontal: 15,
                fontSize: 16,
              }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 8,
              backgroundColor: "#3b82f6",
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontSize: 16, textAlign: "center", display: "block" }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 2,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

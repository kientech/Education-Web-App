import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = useAuthStore((state) => state.userInfo);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    if (userInfo.length === 0) {
      navigation.replace("Home");
    }
  }, [userInfo]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      console.log("🚀 ~ handleLogin ~ user:", user);
      console.log("🚀 ~ handleLogin ~ token:", token);

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userRole = decodedToken.user.role;

      setUserInfo(token, userRole, user);

      Toast.show({
        type: "success",
        text1: "Login Successful",
      });

      navigation.navigate("Main");
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Please check your credentials",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Image
        source={require("../assets/images/login-img.jpg")}
        style={{ width: "100%", height: 500, marginTop: -65 }}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to KienTech</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          ullam quisquam perspiciatis expedita corporis atque illum in porro,
          consequuntur.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            // secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 40,
  },
  subtitle: {
    textAlign: "center",
    paddingVertical: 4,
  },
  formContainer: {
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
  formTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    padding: 4,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    textAlign: "center",
  },
  registerLink: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

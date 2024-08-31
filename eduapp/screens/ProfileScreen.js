import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useAuthStore from "../store/useAuthStore";
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";

const ProfileScreen = ({ navigation }) => {
  const { userInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
  }));

  const [fullname, setFullname] = useState(userInfo.fullname);
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);
  const [password, setPassword] = useState(userInfo.password);

  const handleSave = () => {
    console.log("Fullname saved:", fullname);
  };

  return (
    <SafeAreaView>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconContainer}>
              <ArrowLongLeftIcon style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Profile Edit</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={
              userInfo.image
                ? { uri: userInfo.image }
                : require("../assets/images/signup-img.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullname}
            onChangeText={setFullname}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => console.log("Update")}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#f9fafb",
                }}
              >
                Update
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: "80%",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Correct value
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  inputContainer: {
    marginTop: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#60a5fa",
    width: 250,
    paddingVertical: 18,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "green",
    height: 24,
    width: 80,
  },
});

export default ProfileScreen;

import React from "react";

import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useAuthStore from "../store/useAuthStore";

export default function Home({ navigation }) {
  const data = [
    {
      id: 1,
      image:
        "https://cdn.dribbble.com/userupload/16318493/file/original-37b9b819f19c70bd7a365de95ed0a394.jpg?resize=2048x1536",
      title: "Basic Python",
    },
    {
      id: 2,
      image:
        "https://cdn.dribbble.com/userupload/15495958/file/original-4388ab69abcbea52e76f6e20c1eca82a.png?resize=2048x1536&vertical=center",
      title: "Basic ReactJs",
    },
    {
      id: 3,
      image:
        "https://cdn.dribbble.com/userupload/15495958/file/original-4388ab69abcbea52e76f6e20c1eca82a.png?resize=2048x1536&vertical=center",
      title: "Basic React Native",
    },
  ];
  const { userRole, isLoggedIn, logout } = useAuthStore((state) => ({
    userRole: state.userRole,
    isLoggedIn: state.isLoggedIn,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  const renderVideoCourse = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CourseDetail", { course: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 150, borderRadius: 16, marginRight: 10 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  const renderBasicPopularCourse = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CourseDetail", { course: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 150, borderRadius: 16, marginRight: 10 }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: 600,
            marginTop: 8,
            fontSize: 18,
            paddingLeft: 8,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ marginTop: 8, paddingLeft: 8 }}>15 Lessons</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Status */}
      <View style={styles.header}>
        <View>
          <Text>Hello</Text>
          <Text style={styles.userName}>Kien Duong</Text>
        </View>
        <View>
          <Image
            source={require("../assets/images/signup-img.png")}
            style={styles.profileImage}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.input}>
          <TextInput placeholder="Search" />
        </View>

        <View style={styles.banner}>
          <Image
            source={require("../assets/images/signup-img.png")}
            style={{ width: "100%", height: 200, borderRadius: 16 }}
          />
        </View>

        {/* Video course */}
        <View>
          <Text style={styles.titleText}>Video Course</Text>
          <View style={{ marginTop: 16 }}>
            <FlatList
              data={data}
              renderItem={renderVideoCourse}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Basic Popular Course */}
        <View style={{ marginTop: 16 }}>
          <Text style={styles.titleText}>Basic Popular Course</Text>
          <View style={{ marginTop: 16 }}>
            <FlatList
              data={data}
              renderItem={renderBasicPopularCourse}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  input: {
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  banner: {
    width: "100%",
    height: 200,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
});

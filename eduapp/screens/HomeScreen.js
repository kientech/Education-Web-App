import React, { useEffect, useState } from "react";

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
import axios from "axios";

export default function Home({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/courses");
        setCourses(response.data.data);
      } catch (err) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  // filter basic courses
  const basicPopularCourses = courses.filter(
    (course) => course.difficulty === 0
  );

  const advancedPopularCourses = courses.filter(
    (course) => course.difficulty === 1
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
              data={courses}
              renderItem={renderVideoCourse}
              keyExtractor={(item) => item._id.toString()}
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
              data={basicPopularCourses}
              renderItem={renderBasicPopularCourse}
              keyExtractor={(item) => item._id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Advanced Popular Course */}
        <View style={{ marginTop: 16 }}>
          <Text style={styles.titleText}>Advanced Popular Course</Text>
          <View style={{ marginTop: 16 }}>
            <FlatList
              data={advancedPopularCourses}
              renderItem={renderBasicPopularCourse}
              keyExtractor={(item) => item._id.toString()}
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

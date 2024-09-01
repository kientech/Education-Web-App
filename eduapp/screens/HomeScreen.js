import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import Toast from "react-native-toast-message";

const { width: viewportWidth } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const banners = [
    { id: "1", image: require("../assets/images/login-img.jpg") },
    { id: "2", image: require("../assets/images/signup-img.png") },
    { id: "2", image: require("../assets/images/banner_1.png") },
    { id: "2", image: require("../assets/images/banner_2.png") },
  ];

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

  const { userRole, isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    userRole: state.userRole,
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    Toast.show({
      type: "success",
      text1: "Logout Successful",
    });
    navigation.navigate("Login");
  };

  const renderItem = ({ item }) => (
    <View style={styles.banner}>
      <Image source={item.image} style={styles.bannerImage} />
    </View>
  );

  const renderVideoCourse = ({ item }) => (
    <View
      style={{
        width: 230,
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginRight: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("CourseDetail", { course: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.courseImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  const renderBasicPopularCourse = ({ item }) => (
    <View
      style={{
        width: 230,
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginRight: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("CourseDetail", { course: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.courseImage}
          resizeMode="cover"
        />
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseSubtitle}>15 Lessons</Text>
      </TouchableOpacity>
    </View>
  );

  const basicPopularCourses = courses.filter(
    (course) => course.difficulty === 0
  );
  const advancedPopularCourses = courses.filter(
    (course) => course.difficulty === 1
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Hello</Text>
          {userInfo && userInfo.fullname ? (
            <Text style={styles.userName}>{userInfo.fullname}</Text>
          ) : (
            <Text style={styles.userName}>KienTech's Member</Text>
          )}
        </View>
        <View>
          {userInfo && userInfo.email ? (
            <Menu>
              <MenuTrigger>
                <Image
                  source={
                    userInfo.image
                      ? { uri: userInfo.image }
                      : require("../assets/images/signup-img.png")
                  }
                  style={styles.profileImage}
                />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptions}>
                <MenuOption onSelect={() => navigation.navigate("Profile")}>
                  <Text style={styles.optionText}>Profile</Text>
                </MenuOption>
                <MenuOption onSelect={handleLogout}>
                  <Text style={styles.optionText}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#15803d",
                }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView>
        <View style={styles.input}>
          <TextInput placeholder="Search" />
        </View>

        <View style={{ height: 200 }}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={3}
            loop={true}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            paginationStyle={styles.paginationStyle}
          >
            {banners.map((banner) => (
              <View key={banner.id} style={styles.slide}>
                <Image source={banner.image} style={styles.bannerImage} />
              </View>
            ))}
          </Swiper>
        </View>

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

        {/* Continue learning */}
        <View>
          <Text style={[styles.titleText]}>Continue Learning</Text>
          {courses.length > 0 &&
            courses.map((item) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  marginTop: 10,
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    paddingVertical: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text>72% Complete</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#bbf7d0",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                    width: 100,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "black" }}>
                    {item.lessons} Lessons
                  </Text>
                </View>
              </View>
            ))}
        </View>
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

        <View style={{ marginTop: 16, marginBottom: 32 }}>
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
    flex: 1,
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
  },
  input: {
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  courseImage: {
    width: "100%",
    height: 150,
    marginHorizontal: "auto",
    borderRadius: 16,
    marginRight: 10,
    display: "block",
  },
  courseTitle: {
    fontWeight: "600",
    marginTop: 8,
    fontSize: 18,
    paddingLeft: 8,
  },
  courseSubtitle: {
    marginTop: 8,
    paddingLeft: 8,
  },
  optionText: {
    fontSize: 18,
    padding: 10,
  },
  menuOptions: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  slide: {
    width: "100%",
    height: 200,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  dotStyle: {
    backgroundColor: "transparent",
  },
  activeDotStyle: {
    backgroundColor: "transparent",
  },
  paginationStyle: {
    height: 0,
    marginBottom: 0,
  },
});

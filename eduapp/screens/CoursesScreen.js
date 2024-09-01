import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🚀 ~ CoursesScreen ~ courses:", courses);
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
  return (
    <SafeAreaView>
      <View style={{ width: "90%", marginHorizontal: "auto" }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          All Courses
        </Text>
        <ScrollView>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontWeight: 700,
              width: "60%",
              marginHorizontal: "auto",
              lineHeight: 18,
            }}
          >
            Explore, Learn, Excel – Unlock Your Potential with Every Course!
          </Text>
          <View
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            {courses &&
              courses.length > 0 &&
              courses.map((item) => (
                <View
                  style={{
                    width: "48%",
                    backgroundColor: "#fff",
                    paddingHorizontal: 8,
                    paddingVertical: 16,
                    borderRadius: 16,
                    shadowColor: "#ccc",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CourseDetail", { course: item })
                    }
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.courseImage}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        fontWeight: 14,
                        fontWeight: "bold",
                        marginVertical: 8,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text>{item.lessons} Lessons</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  courseImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    marginRight: 10,
  },
});

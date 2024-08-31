import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CourseDetail({ route }) {
  const { course } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={{ marginTop: 5 }}>
          by{" "}
          <Text style={{ fontWeight: 800, color: "#14b8a6" }}>
            Kien Duong Trung
          </Text>
        </Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.aboutCourse}>About Course</Text>
        <Text style={{ lineHeight: 20 }}>{course?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  courseImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  aboutCourse: {
    fontWeight: 700,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

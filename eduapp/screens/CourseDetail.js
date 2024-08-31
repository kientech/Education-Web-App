import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CourseDetail({ route }) {
  const { course } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseDescription}>Mô tả về khóa học...</Text>
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
  courseDescription: {
    fontSize: 16,
    marginTop: 10,
  },
});

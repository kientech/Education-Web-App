import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AdminCreateNewCourse = () => {
  const initialValues = {
    title: "",
    image: "",
    description: "",
    lessons: 0,
    difficulty: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    description: Yup.string(),
    lessons: Yup.number().min(0, "Lessons must be a positive number"),
    difficulty: Yup.number()
      .min(0, "Difficulty must be at least 0")
      .max(10, "Difficulty cannot exceed 10")
      .required("Difficulty is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/courses/",
        values
      );
      console.log("Course added:", response.data);
      resetForm();
    } catch (error) {
      console.error("There was an error adding the course:", error);
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label>Image URL</label>
            <Field type="text" name="image" />
            <ErrorMessage name="image" component="div" className="error" />
          </div>
          <div>
            <label>Description</label>
            <Field as="textarea" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label>Lessons</label>
            <Field type="number" name="lessons" />
            <ErrorMessage name="lessons" component="div" className="error" />
          </div>
          <div>
            <label>Difficulty</label>
            <Field type="number" name="difficulty" />
            <ErrorMessage name="difficulty" component="div" className="error" />
          </div>
          <button type="submit">Add Course</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminCreateNewCourse;

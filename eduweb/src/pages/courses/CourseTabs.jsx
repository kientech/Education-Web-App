import React from "react";
import Tabs from "../../components/Tabs";

const CourseTabs = () => {
  const tabs = [
    {
      title: "Overview",
      content: (
        <p>
          This is the overview content. Here you will find an introduction to
          the course.
        </p>
      ),
    },
    {
      title: "Curriculum",
      content: (
        <p>
          This is the curriculum content. Here you will find the course modules
          and lessons.
        </p>
      ),
    },
    {
      title: "Instructor",
      content: (
        <p>
          This is the instructor content. Learn more about the course instructor
          here.
        </p>
      ),
    },
    {
      title: "Reviews",
      content: (
        <p>
          This is the reviews content. See what other students have to say about
          this course.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full   mt-8 mb-32">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CourseTabs;

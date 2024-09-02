import React from "react";
import Collapsible from "./Collapsible";

const CourseTopics = () => {
  return (
    <div className="max-w-2xl mt-4">
      <Collapsible title="Introduction to React">
        <p>
          Learn the basics of React, including components, JSX, and state
          management.
        </p>
      </Collapsible>
      <Collapsible title="Advanced React Patterns">
        <p>
          Explore advanced topics like higher-order components, render props,
          and hooks.
        </p>
      </Collapsible>
      <Collapsible title="State Management with Redux">
        <p>
          Understand the core concepts of Redux and how to integrate it with
          React.
        </p>
      </Collapsible>
    </div>
  );
};

export default CourseTopics;

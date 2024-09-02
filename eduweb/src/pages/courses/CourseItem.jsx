import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CourseItem = ({ courseImage, courseTitle, slug }) => {
  return (
    <div className="w-full">
      <Link to={`/courses/${slug}`}>
        <div className="w-full p-2 shadow-sm rounded-lg">
          <img
            src={courseImage}
            alt=""
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="p-4">
            <h1 className="font-semibold text-xl text-gray-950">
              {courseTitle}
            </h1>
            <div className="my-4 flex items-center gap-10">
              <div className="flex items-center gap-x-3   ">
                <HiOutlineUserGroup />
                <h1>03 Students</h1>
              </div>
              <div className="flex items-center gap-x-3">
                <HiOutlineClipboardDocumentList />
                <h1>1 hour 30 minutes</h1>
              </div>
            </div>
            <div className="w-[80%] mx-auto h-[1px] bg-gray-100 rounded-lg my-4"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img
                  src="https://getmasum.com/themes-wp/edumoon/wp-content/uploads/2024/04/3-2.jpg"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <h1 className="text-sm">Kien Duong Trung</h1>
              </div>
              <div>
                <h1 className="text-blue-500">Web Development</h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseItem;

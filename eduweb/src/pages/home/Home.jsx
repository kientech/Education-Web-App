  import React from "react";
  import Header from "../../components/Header";
  import { Link } from "react-router-dom";

  const Home = () => {
    return (
      <div className="w-[90%] mx-auto">
        <div className="w-full h-[600px]">
          <img
            src="https://cdn.dribbble.com/userupload/13136117/file/original-ac957c9946e414ad40b407065df16a36.jpg?resize=1504x2028"
            alt=""
            className="relative w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2/4 -translate-y-2/4 p-10">
            <h3 className="font-semibold text-lg text-white my-4">
              Education Online
            </h3>
            <h1 className="font-bold text-3xl text-white leading-9">
              <span className="text-green-200">Creating</span> a Better Future{" "}
              <br /> through Education
            </h1>
            <p className="text-white text-sm my-8 leading-6">
              It is long established fact that reader distracted by <br /> the
              readable content.
            </p>

            <div>
              <Link
                to={"/courses"}
                className="font-base text-sm py-3 px-12 rounded-full border border-green-200 hover:bg-transparent hover:text-white bg-green-200 text-gray-950 transition-all"
              >
                All Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;

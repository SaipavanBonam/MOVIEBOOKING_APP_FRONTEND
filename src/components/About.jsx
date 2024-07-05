import React from "react";
import Nav from "./Nav";
import bgImage from '../images/photo_city.avif';

export default function About() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-8 text-white">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
          <p className="text-lg leading-relaxed">
            This website is designed for booking movie tickets, focusing on a static payment page. If you encounter difficulty proceeding, ensure all necessary information is selected on the current page before advancing.
            It retrieves the previous data of the user's bookings, and provides login authentication through the backend.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6">Technologies Used</h2>
          <p className="text-lg leading-relaxed">
            The front-end utilizes HTML, CSS, JavaScript, and React for the user interface, complemented by APIs for fetching movie and casting details. For the backend, MongoDB, Node.js, and Express.js are employed.
          </p>
        </section>
        <section>
          <h2 className="text-4xl font-bold mb-6">Project Creator</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <p className="text-lg font-bold mr-2">Created By:</p>
              <p className="text-lg">SaiPavan Bonam</p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold mr-2">LinkedIn:</p>
              <a
                href="https://www.linkedin.com/in/saipavanbonam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <i className="fa-solid fa-link ml-1"></i>
              </a>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold mr-2">GitHub:</p>
              <a
                href="https://github.com/SaipavanBonam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <i className="fa-solid fa-link ml-1"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

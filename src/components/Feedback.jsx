import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Feedback() {
  const location = useLocation();

  const name = location.state.name;
  const mail = location.state.mail;
  const [ratings, setRating] = useState(0);
  const handlestar = (num) => {
    setRating(num);
  };
  const [text, setText] = useState("Submit");

  function handleClick() {
    setText("Thank you " + name);
  }

  const submit = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <textarea
        className="textarea bg-gray-900 text-white rounded-lg p-4 mb-4"
        rows="6"
        cols="40"
        placeholder="Write your feedback"
      />
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlestar(i + 1)}
            className="mr-1 focus:outline-none"
          >
            <i
              className="fa-solid fa-star fa-2x"
              style={{
                color: ` ${i < ratings ? "#FF9529" : "#DDE6ED"}`,
              }}
            ></i>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <form onSubmit={submit}>
          <button
            type="submit"
            className="ticket-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
            id="feedback-button"
            onClick={handleClick}
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../images/theatre.webp';
function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const usernameValid = username.length >= 3;
  const nameValid = name.length >= 5;
  const emailValid = email.endsWith("@gmail.com");
  const phoneValid = phone.match(/^\d{10}$/);
  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword;

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setTouchedFields((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouchedFields({
      username: true,
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (
      usernameValid &&
      nameValid &&
      emailValid &&
      phoneValid &&
      passwordValid &&
      passwordsMatch
    ) {
      try {
        const result = await fetch("https://moviebooking-app-backend.onrender.com/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            email,
            phone,
            password,
          }),
        });
        const response = await result.json();
        if (response.alert) {
          navigate("/", {
            state: { username, email, phone },
          });
          alert("Successfully signed up");
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
       
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${bgImage}')`, // Replace with your actual image path
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
     
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Movie Time Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username (minimum 3 char)"
                name="username"
                onChange={handleInputChange(setUsername)}
                value={username}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, username: true }))
                }
              />
            </div>
            {touchedFields.username && !usernameValid && (
              <p className="text-red-500 mt-1">
                Username must be at least 3 characters long
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name (minimum 5 char)"
                name="name"
                onChange={handleInputChange(setName)}
                value={name}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, name: true }))
                }
              />
            </div>
            {touchedFields.name && !nameValid && (
              <p className="text-red-500 mt-1">
                Name must be at least 5 characters long
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                name="email"
                onChange={handleInputChange(setEmail)}
                value={email}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, email: true }))
                }
              />
            </div>
            {touchedFields.email && !emailValid && (
              <p className="text-red-500 mt-1">
                Email must be a valid Gmail address
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-phone"></i>
              </span>
              <input
                type="tel"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number (10 digits)"
                name="phone"
                onChange={handleInputChange(setPhone)}
                value={phone}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, phone: true }))
                }
              />
            </div>
            {touchedFields.phone && !phoneValid && (
              <p className="text-red-500 mt-1">
                Phone number must be 10 digits long
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password (minimum 8 characters)"
                name="password"
                onChange={handleInputChange(setPassword)}
                value={password}
                onBlur={() =>
                  setTouchedFields((prev) => ({ ...prev, password: true }))
                }
              />
            </div>
            {touchedFields.password && !passwordValid && (
              <p className="text-red-500 mt-1">
                Password must be at least 8 characters long
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-0 top-0 mt-2 ml-2 text-gray-600">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleInputChange(setConfirmPassword)}
                value={confirmPassword}
                onBlur={() =>
                  setTouchedFields((prev) => ({
                    ...prev,
                    confirmPassword: true,
                  }))
                }
              />
            </div>
            {touchedFields.confirmPassword && !passwordsMatch && (
              <p className="text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={
              !usernameValid ||
              !nameValid ||
              !emailValid ||
              !phoneValid ||
              !passwordValid ||
              !passwordsMatch
            }
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
            .
          </p>
        </form>
      </div>

    </div>
  );
}

export default Signup;

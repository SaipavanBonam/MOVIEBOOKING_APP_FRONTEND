import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRedux } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import bgImage from '../images/background.jpg'; // Replace with your actual background image path
import bgImage from '../images/theatre.webp';
function App() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const emailValid = email.endsWith("@gmail.com");
  const passwordValid = password.length >= 8;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (emailValid && passwordValid) {
      try {
        const result = await fetch("https://moviebooking-app-backend.onrender.com/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const response = await result.json();
        if (response.alert) {
          dispatch(loginRedux(response.data.user));
          console.log(response.data.user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home", {
            state: { name: response.data.user.name, mail: response.data.user.email },
          });
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 shadow-lg rounded-lg">
        <section>
          <h1 className="text-3xl font-bold mb-6 text-white text-center">Movie Time</h1>
          <article>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fa fa-envelope text-gray-500"></i>
                  </span>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                    onBlur={() => setEmailTouched(true)}
                  />
                </div>
                {emailTouched && !emailValid && (
                  <p className="text-red-500 mt-2">Email must be a valid Gmail address</p>
                )}
              </div>
              <div className="mb-4">
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fa fa-lock text-gray-500"></i>
                  </span>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Password (minimum 8 characters)"
                    name="password"
                    onChange={handlePasswordChange}
                    value={password}
                    onBlur={() => setPasswordTouched(true)}
                  />
                </div>
                {passwordTouched && !passwordValid && (
                  <p className="text-red-500 mt-2">Password must be at least 8 characters long</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                disabled={!emailValid || !passwordValid}
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-white">
              If you don't have an account, sign up <a href="/signup" className="text-blue-500 underline">here</a>.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;

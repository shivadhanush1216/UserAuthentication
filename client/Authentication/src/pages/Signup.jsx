import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [inputValue, setInputvalue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputValue, [name]: value });
  };

  const handelError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`, // Ensure this line is correct
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handelError(message);
      }
    } catch (error) {
      console.log(error.message);
    }

    setInputvalue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Page</h2>

      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handelOnChange}
            value={email}
            required
          />
        </div>

        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handelOnChange}
            value={username}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handelOnChange}
            value={password}
            required
          />
        </div>

        <button type="submit">Signup</button>

        <span>
          Already have an account <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

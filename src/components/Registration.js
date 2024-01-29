import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import axios from "axios";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function Registration() {
  const [msg, setMsg] = useState("");
  const [loginSwitch, setLoginSwitch] = useState(false);
  const [isRedirected, setRedirection] = useState(false);

  //create a single state of object to store states of all fields
  const [createForm, setCreateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await axios.post(
        `http://localhost:4000/api/user/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (user.status === 200) {
        setRedirection(true);
      }
    }
  };

  // csonst dispatch = useDispatch();

  // const register = () => {
  //   dispatch({
  //     type: "REGISTER",
  //     payload: {
  //       id: new Date().getTime(),
  //       firstName,
  //       email,
  //       password,
  //       address,
  //     },
  //   });
  // };

  const registerData = async (e) => {
    try {
      if (msg.trim().length === 0) {
        console.log("feilds are empty");
        document.alert("Feild should not empty");
      } else {
        const user = await axios.post(
          "http://localhost:4000/api/auth/register",
          createForm
        );
        localStorage.setItem("token", user?.data?.token);
        setCreateForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        if (user && user?.status === 200) {
          setRedirection(true);
        }
        console.log("User Registered Successful", user);
      }

      setConfirmPassword("");
    } catch (error) {
      if (error.request.status === 409) {
        console.log("Email Already Exist");
      }
    }
  };

  const updateFields = (e) => {
    setMsg(e.target.value);
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  useEffect(() => {
    verifyToken();
  });

  // const handleLoginPage = () => {
  //   setLoginSwitch(true);
  // };

  return (
    <>
      {!isRedirected ? (
        <div>
          {loginSwitch ? (
            <Login />
          ) : (
            <div className="container">
              <h2 className="text-center mt-2">Create an Account</h2>
              <form
                className="container-sm mt-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  registerData();
                }}
              >
                <br />
                <input
                  className="form-control"
                  type="text"
                  placeholder="first Name"
                  id="firstName"
                  name="firstName"
                  value={createForm.firstName}
                  onChange={updateFields}
                />
                <br />
                <input
                  className="form-control"
                  type="text"
                  id="last Name"
                  name="lastName"
                  placeholder="lastName"
                  value={createForm.lastName}
                  onChange={updateFields}
                />
                <br />
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={createForm.email}
                  id="email"
                  onChange={updateFields}
                />
                <br />
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={createForm.password}
                  onChange={updateFields}
                />
                <br />
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />

                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create Account"
                />
              </form>
              <p className="my-2">
                Already have an account?
                <span>
                  {/* <a onClick={handleLoginPage} className="btn btn-dark">
                    Login
                  </a> */}
                  <Link to="/login" className="btn btn-dark">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </>
  );
}

export default Registration;

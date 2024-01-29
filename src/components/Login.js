import React, { useState, useEffect } from "react";
import axios from "axios";
import Registration from "./Registration";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [msg, setMsg] = useState("");
  const [isSwitch, setSwitch] = useState(false);
  const [isRedirected, setRedirection] = useState(false);

  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
  });

  const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = await axios.post(
        "http://localhost:4000/api/user/verify-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (user && user?.status === 200) {
        setRedirection(true);
      } else {
        console.log("something went wrong");
        setRedirection(false);
      }
    }
  };

  const loginData = async (e) => {
    try {
      if (msg.trim().length === 0) {
        console.log("feilds are empty");
      } else {
        const user = await axios.post(
          "http://localhost:4000/api/auth/Login",
          createForm
        );
        localStorage.setItem("token", user?.data?.token);
        setCreateForm({
          email: "",
          password: "",
        });
        if (user && user?.status === 200) {
          setRedirection(true);
          console.log("Login Successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateFeilds = (e) => {
    setMsg(e.target.value);
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };
  useEffect(() => {
    verifyToken();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.users);
  // const login = () => {
  //   const payload = users.find(
  //     (user) => user.email === email && user.password === password
  //   );

  //   if (payload) {
  //     dispatch({
  //       type: "LOGIN",
  //       payload,
  //     });
  //   }
  // };
  // const handleSignUpClick = () => {
  //   setSwitch(true);
  // };
  return (
    <div className="container-sm mt-2">
      {!isRedirected ? (
        <div>
          {isSwitch ? (
            <Registration />
          ) : (
            <div>
              <h2 className="text-center mt-2">Sign In</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginData();
                }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={createForm.email}
                  name="email"
                  onChange={updateFeilds}
                  className="form-control"
                />
                <br />
                <input
                  type="password"
                  placeholder="password"
                  className="form-control"
                  name="password"
                  value={createForm.password}
                  onChange={updateFeilds}
                />
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="login"
                />
                <p className="my-2">
                  Not have account?
                  <span>
                    {/* <a onClick={handleSignUpClick} className="btn btn-dark">
                      SignUp
                    </a> */}
                    <Link to="/register" className="btn btn-dark">
                      Register
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Login;

// <a className="btn btn-primary" onClick={handleLogOut}>
//         Logout
//       </a>

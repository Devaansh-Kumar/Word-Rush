import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../components/Shared/Spinner";
import "./Form.css";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const token = response.headers.get("Authorization");
      localStorage.setItem("token", token);
      setLoading(false); 
      navigate("/game");
    } catch (error) {
      console.error(error);
      setError("An error occurred during login.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true); 
      setTimeout(() => {
        setLoading(false); 
        navigate("/game");
      }, 1000);
    }
  }, [navigate]);

  return (
    <>
      {loading ? ( 
        <Spinner />
      ) : (
        <Formik
          validationSchema={schema}
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className=" w-[360px] pt-[8%] pb-0 px-0
            font-mono">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
                  <span>Login</span>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Enter username"
                    className="form-control inp_text"
                    id="username"
                  />
                  <p className="error">
                    {errors.username && touched.username && errors.username}
                  </p>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  {error && <p className="error">{error}</p>}
                  <button type="submit">Login</button>
                  <Link to="/register" className="link">
                    New User? Create an account.
                  </Link>
                </form>
              </div>
            </div>
          )}
        </Formik>
      )}
      {localStorage.getItem("token") && navigate("/game")}
    </>
  );
}

export default Login;
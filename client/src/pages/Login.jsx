import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./Form.css";
import Spinner from "../components/Spinner";

// Creating schema
const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    const startTime = Date.now();

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

      const elapsedTime = Date.now() - startTime;
      const delay = elapsedTime > 0 ? 1 : 0;

      if (delay) 
      {
        setRedirecting(true);
        setTimeout(() => {
          navigate("/game");
        }, delay);
      } 
      else 
      {
        navigate("/game");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      // Display the spinner when loading is true
      const spinnerTimeout = setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);

      return () => {
        clearTimeout(spinnerTimeout);
      };
    }
  }, [loading, navigate]);

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
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
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
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
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Display error message if login fails */}
                {error && <p className="error">{error}</p>}
                {/* Render the spinner component if loading is true */}
                {redirecting && <Spinner />}
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
                <Link to="/register" className="link">
                  New User? Create an account.
                </Link>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
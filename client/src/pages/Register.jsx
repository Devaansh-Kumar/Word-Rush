import React, { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import './Form.css';

// Creating schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  username: Yup.string().required("Username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    setError("");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      // Handle successful registration
      console.log(data.message);

      const token = localStorage.getItem('token');
      localStorage.setItem('token', token);

      navigate("/game");
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration.");
    }
  };

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", username: "", password: "" }}
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
          <div className="registration">
            <div className="form">
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Registration</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter name"
                  className="form-control inp_text"
                  id="name"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.name && touched.name && errors.name}
                </p>
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
                {/* Display error message if registration fails */}
                {error && <p className="error">{error}</p>}
                {/* Click on submit button to submit the form */}
                <button type="submit">Register</button>
                <Link to="/login" className="link">
                  Already have an account? Login here.
                </Link>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Register;

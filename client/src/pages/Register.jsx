import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../components/Shared/Spinner";
import "./Form.css";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  username: Yup.string().required("Username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

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
        setLoading(false);
        return;
      }

      console.log(data.message);

      setLoading(false); 
      const token = response.headers.get("Authorization");
      localStorage.setItem("token", token);

      navigate("/game");
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration.");
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
                <form noValidate onSubmit={handleSubmit}>
                  <span>Registration</span>
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
                  <p className="error">
                    {errors.name && touched.name && errors.name}
                  </p>
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
                  <button type="submit">Register</button>
                  <Link to="/login" className="link">
                    Already have an account? Login here.
                  </Link>
                </form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}

export default Register;

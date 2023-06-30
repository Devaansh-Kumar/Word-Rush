import "./Form.css";
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";

// Creating schema
const schema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Register() {
  return (
    <>
      {/* Wrapping form inside Formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ fullName: "", email: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
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
              {/* Passing handleSubmit parameter to HTML form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Registration</span>
                {/* Our input field for Full Name */}
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder="Enter Full Name"
                  className="form-control inp_text"
                />
                {/* If validation is not passed, show errors */}
                <p className="error">
                  {errors.fullName && touched.fullName && errors.fullName}
                </p>
                {/* Our input field for Email */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                />
                {/* If validation is not passed, show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input field for Password */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed, show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
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

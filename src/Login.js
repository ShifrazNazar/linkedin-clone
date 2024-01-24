import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a full name"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    profilePic: Yup.string().url("Invalid URL format"),
  });

  const formik = useFormik({
    initialValues: {
      name: "Demo Guy",
      email: "demo@gmail.com",
      password: "demo@123",
      profilePic: "https://i.pinimg.com/474x/bd/18/cb/bd18cb31dc17600e58570dbf53ce38da.jpg",
    },
    validationSchema,
    onSubmit: (values) => {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userAuth) => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              profileUrl: userAuth.user.photoURL,
            })
          );
          toast.success("Login successful!", { position: toast.POSITION.TOP_RIGHT });
        })
        .catch((error) => {
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        });
    },
  });

  const register = () => {
    auth
      .createUserWithEmailAndPassword(formik.values.email, formik.values.password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: formik.values.name,
            photoURL: formik.values.profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: formik.values.name,
                photoURL: formik.values.profilePic,
              })
            );
            toast.success("Registration successful!", { position: toast.POSITION.TOP_RIGHT });
          });
      })
      .catch((error) => {
        toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <h1>Linked</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="Linkedin" />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className={formik.touched.name && formik.errors.name ? "error" : ""}
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

        <input
          type="text"
          placeholder="Profile pic URL (optional)"
          name="profilePic"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.profilePic}
          className={formik.touched.profilePic && formik.errors.profilePic ? "error" : ""}
        />
        {formik.touched.profilePic && formik.errors.profilePic && (
          <div className="error">{formik.errors.profilePic}</div>
        )}

        <input
          type="email"
          placeholder="Demo@gmail.com"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? "error" : ""}
        />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

        <input
          type="password"
          placeholder="demo@123"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={formik.touched.password && formik.errors.password ? "error" : ""}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <button type="submit">Sign In</button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>

      <ToastContainer />
    </div>
  );
}

export default Login;

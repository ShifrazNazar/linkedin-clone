import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    onSubmit: async (values) => {
      try {
        const userAuth = await auth.signInWithEmailAndPassword(values.email, values.password);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      } catch (error) {
        toast.error("Login unsuccessful. Please register.");
      }
    },
  });

  const register = async () => {
    try {
      if (!formik.values.name) {
        throw new Error("Please enter a full name");
      }

      const userAuth = await auth.createUserWithEmailAndPassword(formik.values.email, formik.values.password);

      await userAuth.user.updateProfile({
        displayName: formik.values.name,
        photoURL: formik.values.profilePic,
      });

      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: formik.values.name,
          profileUrl: formik.values.profilePic,
        })
      );

      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login__logo">
        <h1>Linked</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="Linkedin" />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          placeholder="Username"
          name="name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}

        <input
          value={formik.values.profilePic}
          onChange={formik.handleChange}
          type="text"
          placeholder="Profile pic URL (optional)"
          name="profilePic"
        />
        {formik.touched.profilePic && formik.errors.profilePic ? (
          <div className="error">{formik.errors.profilePic}</div>
        ) : null}

        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          placeholder="Demo@gmail.com"
          name="email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          placeholder="demo@123"
          name="password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button type="submit">Sign In</button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Button,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import axiosInstance from "../lib/axios.instance.js";

const Login = () => {
  const navigate = useNavigate();

  const loginUser = async (values) => {
    try {
      const res = await axiosInstance.post("/user/login", values);
      const accessToken = res?.data?.accessToken;
      const firstName = res?.data?.userDetails?.firstName;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("firstName", firstName);

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("You ain't an authorized user");
    }
  };
  return (
    <div className={styles.login_form_container}>
      <div className={styles.left}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Must be a valid email.")
              .required("Email is required.")
              .trim()
              .lowercase()
              .max(60, "Email must be at most 60 characters."),
            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={(values) => {
            loginUser(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  minWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  gap: "2rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#243b55",
                  }}
                >
                  Sign in
                </Typography>

                <FormControl fullWidth>
                  <TextField label="Email" {...formik.getFieldProps("email")} />

                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  type="submit"
                  sx={{
                    background: "linear-gradient(to right, #00093c, #2d0b00)",
                    color: "white",
                    margin: "10px",
                    border: "none",
                    outline: "none",
                    padding: "12px 0",
                    borderRadius: " 20px",
                    width: "180px",
                    fontweight: "bold",
                    fontsize: "14px",
                    cursor: "pointer",
                    "&:hover": {
                      border: "none",
                      color: "white",
                      background: "Green",
                    },
                  }}
                >
                  Login
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.right}>
        <h1>New Here ?</h1>
        <Link to="/register">
          <button type="button" className={styles.white_btn}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

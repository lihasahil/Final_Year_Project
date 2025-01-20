import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from "@mui/material";
import axiosInstance from "../lib/axios.instance.js";

function Register() {
  const navigate = useNavigate();

  const registerUser = async (values) => {
    try {
      await axiosInstance.post("/user/register", values);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("User already exist!! Please Login..");
    }
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Must be a valid email.")
                .required("Email is required.")
                .trim()
                .lowercase()
                .max(50, "Email must be at most 50 characters."),
              password: Yup.string().trim().required("Password is required."),
              firstName: Yup.string().trim().max(20).required(),
              lastName: Yup.string().trim().max(20).required(),
            })}
            onSubmit={(values) => {
              registerUser(values);
            }}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    minWidth: "300px",
                    maxHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                    gap: "0.8rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#243b55",
                    }}
                  >
                    Sign Up
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      {...formik.getFieldProps("email")}
                    />

                    {formik.touched.email && formik.errors.email ? (
                      <FormHelperText error>
                        {formik.errors.email}
                      </FormHelperText>
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
                  <FormControl fullWidth>
                    <TextField
                      label="First Name"
                      {...formik.getFieldProps("firstName")}
                    />

                    {formik.touched.firstName && formik.errors.firstName ? (
                      <FormHelperText error>
                        {formik.errors.firstName}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Last Name"
                      {...formik.getFieldProps("lastName")}
                    />

                    {formik.touched.lastName && formik.errors.lastName ? (
                      <FormHelperText error>
                        {formik.errors.lastName}
                      </FormHelperText>
                    ) : null}
                  </FormControl>

                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      background:
                        "linear-gradient(to right, #00093c, #2d0b00);",
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
                    Sign Up
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Register;

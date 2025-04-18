import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axios.instance.js";

const ReportForm = () => {
  const [lostPersonImage, setLostPersonImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [addFoodLoading, setAddFoodLoading] = useState(false);

  const navigate = useNavigate();

  const addFood = async (values) => {
    try {
      setAddFoodLoading(true);
      const res = await axiosInstance.post("/lostPerson/add", values);
      setAddFoodLoading(false);

      navigate("/home");
      alert("Detail Successfully Added to Database");
    } catch (error) {
      setAddFoodLoading(false);

      console.log(error);
    }
  };

  if (imageLoading || addFoodLoading) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        width: "60%",
        marginLeft: "20%",
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          name: "",
          height: "",
          weight: "",
          contact: "",
          missingDate: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Name is required.")
            .trim()
            .max(50, "Name must be at most 50 characters."),
          height: Yup.string().required("Height is required.").trim(),
          weight: Yup.string().required("Height is required.").trim(),
          contact: Yup.string().required("Contact is required.").trim(),
          missingDate: Yup.string().required("Contact is required.").trim(),
          description: Yup.string()
            .required("Description is required.")
            .trim()
            .min(20, "Description must be at least 20 characters.")
            .max(1000, "Description must be at max 1000 characters."),
        })}
        onSubmit={async (values) => {
          if (lostPersonImage) {
            const cloudName = "dlkcko4n6";

            const uploadPreset = "hcoe-restaurant";

            const formData = new FormData();

            formData.append("cloud_name", cloudName);
            formData.append("upload_preset", uploadPreset);
            formData.append("file", lostPersonImage);

            try {
              setImageLoading(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
              );
              setImageLoading(false);
              values.image = res?.data?.secure_url;
            } catch (error) {
              setImageLoading(false);
              console.log(error);
            }
          }
          addFood(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                minWidth: "400px",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Report Lost Person</Typography>

              {localUrl && (
                <img
                  src={localUrl}
                  style={{ height: "250px", width: "100%" }}
                />
              )}
              <FormControl
                sx={{
                  marginLeft: "30%",
                }}
              >
                <input
                  type="file"
                  onChange={(event) => {
                    const image = event.target.files[0];
                    setLostPersonImage(image);
                    setLocalUrl(URL.createObjectURL(image));
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField label="Name" {...formik.getFieldProps("name")} />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    sx={{
                      marginRight: "10%",
                    }}
                    label="Height"
                    {...formik.getFieldProps("height")}
                  />

                  {formik.touched.height && formik.errors.height ? (
                    <FormHelperText error>
                      {formik.errors.height}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Weight"
                    {...formik.getFieldProps("weight")}
                  />

                  {formik.touched.weight && formik.errors.weight ? (
                    <FormHelperText error>
                      {formik.errors.weight}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <FormControl fullWidth>
                <TextField
                  label="Contact"
                  {...formik.getFieldProps("contact")}
                />

                {formik.touched.contact && formik.errors.contact ? (
                  <FormHelperText error>{formik.errors.contact}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Missing Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("missingDate")}
                />

                {formik.touched.missingDate && formik.errors.missingDate ? (
                  <FormHelperText error>
                    {formik.errors.missingDate}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  multiline
                  minRows={6}
                  maxRows={10}
                  label="Description"
                  {...formik.getFieldProps("description")}
                />

                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ReportForm;

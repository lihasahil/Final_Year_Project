import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../lib/axios.instance";

const LostPersonDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [lostPersonDetail, setLostPersonDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLostPersonDetail = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state before request
        const res = await axiosInstance.get(`/lostPerson/details/${params.id}`);
        setLostPersonDetail(res?.data?.lostPersonDetail);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getLostPersonDetail();
  }, [params.id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!lostPersonDetail) {
    return (
      <Typography variant="h6" color="error">
        No details found for this person.
      </Typography>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          gap: "2rem",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          width: "70vw",
        }}
      >
        {/* Image Section */}
        <Box sx={{ width: "50%" }}>
          <img
            src={
              lostPersonDetail?.image ||
              "https://via.placeholder.com/500x500?text=No+Image"
            }
            alt="Lost Person"
            height="500px"
            width="100%"
          />
        </Box>

        {/* Details Section */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Name: {lostPersonDetail?.name}</Typography>
          <Typography>Height: {lostPersonDetail?.height}</Typography>
          <Typography>Weight: {lostPersonDetail?.weight}</Typography>
          <Typography>Contact: {lostPersonDetail?.contact}</Typography>
          <Typography>Missing Date: {lostPersonDetail?.missingDate}</Typography>
          <Typography sx={{ textAlign: "justify" }}>
            Description: {lostPersonDetail?.description}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                background: "linear-gradient(to right, #00093c, #2d0b00)",
                color: "white",
                alignContent: "center",
                justifyContent: "center",
                border: "none",
                outline: "none",
                padding: "12px 0",
                borderRadius: " 20px",

                fontweight: "bold",
                fontsize: "14px",
                cursor: "pointer",
                "&:hover": {
                  border: "none",
                  color: "white",
                  background: "Green",
                },
              }}
              fullWidth
              onClick={() => navigate("/home")}
            >
              Return to Home
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default LostPersonDetail;

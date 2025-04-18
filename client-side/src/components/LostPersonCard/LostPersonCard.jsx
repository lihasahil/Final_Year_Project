import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const LostPersonCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "350px" }}>
      <CardMedia
        onClick={() => {
          navigate(`/lostPerson-detail/${props._id}`);
        }}
        sx={{ height: "250px", cursor: "pointer", objectFit: "cover" }}
        image={
          props.imageUrl ||
          "https://imgs.search.brave.com/6iInfQJbL7Mu73vJg5kN520wjLKO3kBUbZh_sn17d5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzg1LzUzLzI3/LzM2MF9GXzc4NTUz/Mjc4MV9DRjdKNUd3/Njd5SWd2QjBNRmJX/NVFPeXplanNMVjZm/eC5qcGc"
        }
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name:{props.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          Description:{props.description.substring(0, 200)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
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
          variant="contained"
          onClick={() => {
            navigate(`/lostPerson-detail/${props?._id}`);
          }}
        >
          View Full Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default LostPersonCard;

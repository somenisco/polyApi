import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PasteCard({ paste }) {
  const [expiry, setExpiry] = useState(0);
  let navigate = useNavigate();
  const handleDelete = (event) => {
    axios
      .delete(`/paste/${paste.shortid}`)
      .then(function (response) {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleExpiry = (event) => {
    setExpiry(event.target.value);
  };

  const handleRenew = (event) => {
    axios
      .put(`/paste/edit/${paste.shortid}`, { expiry })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card sx={{ minWidth: 500, margin: "10px" }}>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="body1">{paste.content}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          <Link
            underline="none"
            variant="body1"
            href={`/${paste.shortid}`}
            sx={{ color: "white", display: "block" }}
          >
            Link
          </Link>
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <div style={{ marginLeft: "auto" }}>
          <FormControl variant="filled" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Expiry
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={expiry}
              onChange={handleExpiry}
            >
              <MenuItem value={0}>No change</MenuItem>
              <MenuItem value={600000}>10 minutes</MenuItem>
              <MenuItem value={3600000}>1 hour</MenuItem>
              <MenuItem value={86400000}>1 day</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" size="small" onClick={handleRenew}>
          renew
        </Button>
      </CardActions>
    </Card>
  );
}

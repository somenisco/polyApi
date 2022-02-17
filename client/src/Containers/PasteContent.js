import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function PasteContent() {
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  let navigate = useNavigate();
  const [state, setstate] = useState("");
  const [expiry, setExpiry] = useState(0);
  const [errormsg, seterrormsg] = useState("");
  const [ipad, setipad] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [password, setpassword] = useState("");
  const handlePassword = (event) => {
    setpassword(event.target.value);
  };

  const { pasteid } = useParams();
  var url = "/paste/" + pasteid;
  useEffect(() => {
    axios
      .get(`/paste/access/${pasteid}`)
      .then(function (response) {
        const arr = response.data;
        console.log(arr);
        setipad([]);
        arr.map((a) => {
          setipad((ipad) => [...ipad, a]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(url)
      .then(function (response) {
        // console.log(response.data);
        if (response.data.message) {
          setOpen(true);
        } else {
          if (validURL(response.data.content)) {
            window.location.href = response.data.content;
          } else {
            setstate(response.data.content);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setstate("not found");
      });
  }, [navigate]);

  useEffect(() => {
    if (state === "not found") {
      navigate("/");
    }
  }, [state]);

  const handleSubmit = (event) => {
    axios
      .post(`/paste/encrypted/${pasteid}`, { password })
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          console.log(response.data.message);
          seterrormsg(response.data.message);
          setpassword("");
        } else {
          if (validURL(response.data.content)) {
            window.location.href = response.data.content;
          } else {
            console.log(response.data.content);
            setstate(response.data.content);
            console.log(state);
          }
          setOpen(false);
        }
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
      .put(`/paste/edit/${pasteid}`, { expiry })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (event) => {
    axios
      .delete(`/paste/${pasteid}`)
      .then(function (response) {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            provide key to decrypt the data
          </Typography>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              error={errormsg ? true : false}
              label="key"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
              helperText={errormsg}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ marginTop: "5px" }}
            >
              submit
            </Button>
          </div>
        </Box>
      </Modal>
      {state && (
        <Card sx={{ minWidth: 500 }}>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography variant="body1">{state}</Typography>
          </CardContent>
          <CardActions>
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
      )}
      {ipad.length > 0 && state && (
        <Container>
          <p>accessed by ips</p>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {ipad.map((p) => {
              return (
                <ListItem key={p._id}>
                  <ListItemText primary={p.ipadd} />
                  <p>{p.createdAt}</p>
                </ListItem>
              );
            })}
          </List>
        </Container>
      )}
    </Container>
  );
}

export default PasteContent;

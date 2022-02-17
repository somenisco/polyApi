import React from "react";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import KeyIcon from "@mui/icons-material/Key";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

function PasteArea() {
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [encrypt, setencrypt] = useState(false);
  const [password, setpassword] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const createPaste = (event) => {
    var newcontent;
    if (encrypt) {
      newcontent = { content, encrypt, password };
    } else {
      newcontent = { content, encrypt };
    }

    axios
      .post("/paste/", newcontent)
      .then((response) => {
        const dataid = response.data.newPaste_id;
        navigate(`/${dataid}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEncrypt = (event) => {
    if (encrypt) {
      setencrypt(false);
      setpassword("");
    } else {
      setencrypt(true);
    }
  };

  const handlePassword = (event) => {
    setpassword(event.target.value);
  };

  return (
    <div style={{width: "100%"}}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox onClick={handleEncrypt} />
              </ListItemIcon>
              <ListItemText primary="encrypt" />
            </ListItem>
            <ListItem>
              <KeyIcon sx={{margin: "3px"}} />
              <TextField
                id="outlined-password-input"
                label="key"
                type="password"
                autoComplete="current-password"
                disabled={!encrypt}
                value={password}
                onChange={handlePassword}
              />
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained" onClick={createPaste}>
                Create Paste
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{margin: "20px", marginLeft: "255px"}}>
        <Toolbar />
        <TextField
          id="filled-multiline-static"
          fullWidth
          label="Paste Here!"
          multiline
          rows={20}
          variant="filled"
          value={content}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}

export default PasteArea;

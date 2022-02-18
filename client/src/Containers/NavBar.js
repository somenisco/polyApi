import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function NavBar() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link
              underline="none"
              variant="h5"
              href="/"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              PolyAPI
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Typography variant="h6" noWrap component="div">
            <Link
              underline="none"
              variant="h6"
              href="/pastes"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Recent Snippets
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;

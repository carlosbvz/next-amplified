import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box mt={2}>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              © 2021 POC
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

import { FC, PropsWithChildren } from "react";

import { Header } from "../Header/Header";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

import { Link } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink component={Link} color="inherit" to="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Box py={2} minHeight="calc(100vh - 180px)">
          {children}
        </Box>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

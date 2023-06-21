import { useRouteError } from "react-router-dom";

import { Container, Typography, Stack, Link } from "@mui/material";

export function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <Container component={Stack} spacing={4} py={8}>
      <Typography component={Link} href="/">
        Go to home page
      </Typography>

      <Typography variant="h4">Oops!</Typography>
      <Typography color="GrayText">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography>
        <i>{error?.statusText || error?.message}</i>
      </Typography>
    </Container>
  );
}

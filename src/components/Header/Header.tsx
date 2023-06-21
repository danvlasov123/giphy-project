import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useStore } from "../../providers/StoreProvider";
import { UserMenu } from "../UserMenu/UserMenu";

export const Header = () => {
  const { user } = useStore();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            fontWeight={600}
            component={Link}
            color="inherit"
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              display: { xs: "none", sm: "block" },
            }}
          >
            GIF Project
          </Typography>
          <Stack spacing={1} direction="row">
            <Button
              color="inherit"
              size="small"
              component={Link}
              to="/favorites"
            >
              <Typography fontWeight={500} variant="body2">
                Favorites Gifs
              </Typography>
            </Button>
            {user?.name ? (
              <UserMenu />
            ) : (
              <Button
                color="primary"
                size="small"
                component={Link}
                to="/sign-in"
              >
                <Typography fontWeight={500} variant="body2">
                  Sign In
                </Typography>
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

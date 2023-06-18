import "./App.css";
import { Search } from "./components/Search/Search";
import { GifsList } from "./components/GifsList/GifsList";
import { Box, Container, Grid, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Grid container pt={4} pb={2} spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={600} noWrap>
            GIF Project
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Search />
        </Grid>
      </Grid>

      <Box>
        <GifsList />
      </Box>
    </Container>
  );
}

export default App;

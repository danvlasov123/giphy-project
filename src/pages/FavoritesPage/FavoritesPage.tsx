import { Typography, Box, Alert } from "@mui/material";
import { GifsList } from "../../components/GifsList/GifsList";

import { useStore } from "../../providers/StoreProvider";

const FavoritesPage = () => {
  const { user, favorites } = useStore();

  return (
    <Box py={2}>
      <Typography variant="h4">Favorites Gifs</Typography>
      <Typography color="GrayText">
        Here you will find gifs that you have added to your favorites
      </Typography>

      {!user ? (
        <Box py={2} display="flex">
          <Alert severity="error">
            To add a gif to your favorites, you need to Log in!
          </Alert>
        </Box>
      ) : (
        <GifsList data={favorites} />
      )}
    </Box>
  );
};

export { FavoritesPage };

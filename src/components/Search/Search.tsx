import { FC, FormEvent } from "react";

import { useSWRConfig } from "swr";

import { fetcher, GET_GIPHY_URL, GET_SEARCH_GIPHY_URL } from "../../api/api";

import { TextField, Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search: FC = () => {
  const { mutate: update } = useSWRConfig();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const value = data.get("search") ?? "";

    if (!value) {
      return update(GET_GIPHY_URL, fetcher(GET_GIPHY_URL));
    }

    update(
      GET_GIPHY_URL,
      fetcher(GET_SEARCH_GIPHY_URL, {
        params: {
          q: value,
        },
      }),
      false
    );
  };

  return (
    <Grid
      component="form"
      autoComplete="off"
      container
      spacing={1}
      flexWrap="nowrap"
      onSubmit={handleSubmit}
      alignItems="center"
    >
      <Grid item width="100%">
        <TextField
          name="search"
          fullWidth
          placeholder="Search all gifs"
          required
        />
      </Grid>
      <Grid item height="100%">
        <Button
          size="large"
          sx={{ p: 1.3 }}
          variant="contained"
          disableElevation
          fullWidth
          type="submit"
        >
          <SearchIcon htmlColor="white" fontSize="large" />
        </Button>
      </Grid>
    </Grid>
  );
};

export { Search };

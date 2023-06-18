import { FC, FormEvent } from "react";
import { OutlinedInput, Button, Grid } from "@mui/material";

import { useSWRConfig } from "swr";

import { fetcher, GET_GIPHY_URL, GET_SEARCH_GIPHY_URL } from "../../api/api";
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
      onSubmit={handleSubmit}
    >
      <Grid item xs={10}>
        <OutlinedInput
          size="small"
          name="search"
          fullWidth
          placeholder="Search all gifs"
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          sx={{ height: "100%" }}
          type="submit"
          variant="outlined"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export { Search };

import useSWR from "swr";
import { Box } from "@mui/material";

import { Search } from "../../components/Search/Search";

import { GifsList } from "../../components/GifsList/GifsList";

import { GET_GIPHY_URL, fetcher } from "../../api/api";

export const HomePage = () => {
  const { isLoading, data } = useSWR(GET_GIPHY_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      <Box>
        <Search />
      </Box>
      <Box>
        <GifsList data={data?.data} isLoading={isLoading} />
      </Box>
    </>
  );
};

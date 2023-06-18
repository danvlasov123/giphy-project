import useSWR from "swr";

import { GET_GIPHY_URL, fetcher } from "../../api/api";

import { Box, CircularProgress, ImageList } from "@mui/material";
import { GifsCard } from "../GifsCard/GifsCard";

const GifsList = () => {
  const { isLoading, data } = useSWR(GET_GIPHY_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false, 
  });

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList cols={5}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((item: any) => (
              <GifsCard item={item} key={item?.id} />
            ))
          }
        </ImageList>
      )}
    </Box>
  );
};

export { GifsList };

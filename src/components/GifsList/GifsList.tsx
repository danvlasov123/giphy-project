import { FC } from "react";
import { Box, CircularProgress, ImageList } from "@mui/material";
import { GifsCard } from "../GifsCard/GifsCard";

import useMediaQuery from "@mui/material/useMediaQuery";

type GifsListType = {
  data: any[];
  isLoading?: boolean;
};

const GifsList: FC<GifsListType> = ({ data, isLoading = false }) => {
  const isMobile = useMediaQuery("(max-width:440px)");

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList cols={isMobile ? 1 : 5} gap={12} variant="quilted">
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

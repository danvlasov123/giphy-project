import { FC, memo } from "react";

import { IconButton, ImageListItem, Stack, Box } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import { saveAs } from "file-saver";

import "./style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GifsCard: FC<any> = memo(({ item }) => {
  const handleDownload = (name?: string, url?: string) => {
    if (url && name) {
      saveAs(url, name);
    }
  };

  return (
    <ImageListItem key={item?.id} className="giphy__card">
      <img
        style={{ borderRadius: 4 }}
        src={item?.images?.fixed_height?.url}
        alt={item?.title}
        height="100%"
        width="100%"
        loading="lazy"
      />
      <Stack component={Box} className="card__actions" p={1}>
        <IconButton
          className="card__actions--button"
          onClick={() =>
            handleDownload(item?.title, item?.images?.original?.url)
          }
        >
          <DownloadIcon />
        </IconButton>
      </Stack>
    </ImageListItem>
  );
});

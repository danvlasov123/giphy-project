import { FC, memo, useMemo } from "react";

import { IconButton, ImageListItem, Stack, Box } from "@mui/material";

import { FAVORITES_URL } from "../../api/api";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

import "./style.css";

type TypeGifsCardProps = {
  item: any;
};

import { useStore } from "../../providers/StoreProvider";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GifsCard: FC<TypeGifsCardProps> = memo(({ item }) => {
  const { favorites, user, setFavorites } = useStore();

  const isFavorite = useMemo(
    () => favorites.some((gif) => gif.id === item.id),
    [favorites, item.id]
  );

  const favoritesIds = useMemo(
    () => favorites.map((gif) => gif.id),
    [favorites]
  );

  const handleDownload = (name?: string, url?: string) => {
    if (url && name) {
      saveAs(url, name);
    }
  };

  const handleAddToFavorites = async () => {
    setFavorites((items) => [...items, item]);

    if (favorites.length) {
      await axios(`${FAVORITES_URL}/${user?.id}`, {
        method: "PUT",
        data: {
          id: user?.id,
          favorites: [...favoritesIds, item?.id],
        },
      });
    }

    if (!favorites.length) {
      await axios.post(`${FAVORITES_URL}`, {
        favorites: [...favoritesIds, item?.id],
        id: user?.id.toString(),
      });
    }
  };

  const handleRemoveFromFavorites = async () => {
    const filterFavorites = favorites.filter((gif) => gif.id !== item.id);

    setFavorites(filterFavorites);

    await axios(`${FAVORITES_URL}/${user?.id}`, {
      method: "PUT",
      data: {
        id: user?.id,
        favorites: filterFavorites.map((gif) => gif.id),
      },
    });
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
      <Stack
        component={Box}
        className="card__actions"
        p={1}
        spacing={1}
        direction="row"
      >
        <IconButton
          className="card__actions--button"
          onClick={() =>
            handleDownload(item?.title, item?.images?.original?.url)
          }
        >
          <DownloadIcon />
        </IconButton>
        {user?.id && (
          <>
            {!isFavorite ? (
              <IconButton
                className="card__actions--button"
                onClick={handleAddToFavorites}
              >
                <BookmarkAddIcon />
              </IconButton>
            ) : (
              <IconButton
                className="card__actions--button"
                onClick={handleRemoveFromFavorites}
              >
                <BookmarkRemoveIcon />
              </IconButton>
            )}
          </>
        )}
      </Stack>
    </ImageListItem>
  );
});

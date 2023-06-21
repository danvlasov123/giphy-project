import {
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";

import { createContext } from "react";
import { getAuthLocal } from "../utils/authStorage";

import { FAVORITES_URL, fetcher, api_url } from "../api/api";

export type UserType = {
  name: string;
  id: string;
  email: string;
};

export type FavoritesType = any[];

type StoreContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  favorites: FavoritesType;
  setFavorites: Dispatch<SetStateAction<FavoritesType>>;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(getAuthLocal());
  const [favorites, setFavorites] = useState<FavoritesType>([]);

  useEffect(() => {
    const initial = async () => {
      if (!user?.id) {
        return;
      }

      const response = await fetcher(`${FAVORITES_URL}/${user.id}`);

      if (!response.favorites) {
        return;
      }

      const favorites_ids = response.favorites;

      const favoritesGifs = await fetcher(api_url, {
        params: {
          ids: favorites_ids.join(","),
        },
      }).then((res) => res.data);

      setFavorites(favoritesGifs);
    };

    initial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore has to be used within <StoreContext.Provider>");
  }

  return context;
};

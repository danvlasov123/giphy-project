import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import {
  HomePage,
  SignInPage,
  FavoritesPage,
  ErrorPage,
  SignUpPage,
} from "./pages";

import { Layout } from "./components/Layout/Layout";

import { StoreProvider } from "./providers/StoreProvider";

const pageWithLayout = (page: JSX.Element) => {
  return <Layout>{page}</Layout>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: pageWithLayout(<HomePage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/favorites",
    element: pageWithLayout(<FavoritesPage />),
  },
]);

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;

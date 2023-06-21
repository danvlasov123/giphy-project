export const setAuthLocal = (data: unknown) =>
  localStorage.setItem("giphy-user", JSON.stringify(data));

export const getAuthLocal = () => {
  const data = localStorage.getItem("giphy-user");

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export const clearAuthLocal = () => localStorage.removeItem("giphy-user");

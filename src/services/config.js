export const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("vois-user")).token;
  return {
    headers: {
      Authorization: `${token}`,
    },
  };
};

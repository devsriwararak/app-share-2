export const Authorization = `Bearer ${localStorage.getItem(
  "app_share_token"
)}`;

export const checkNoToken = (message) => {
  if (message === "Unauthorized") {
    localStorage.clear();
    window.location.reload();
  }
};

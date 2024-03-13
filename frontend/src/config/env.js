export const REACT_SERVER_URL =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:5000"
    : "https://iv-chat.onrender.com";
export const REACT_SERVER_URL =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:5000"
    : "https://47.128.215.105:8445";
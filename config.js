//export const API_URL = process.env.REACT_APP_API_URL;

const IS_PROD = process.env.NODE_ENV === "production";
// src/config.js
export const API_URL = IS_PROD
    ? "https://mnemosym-backend-a9whf8yxh-axel-35s-projects.vercel.app"
    : "http://localhost:3000" ;
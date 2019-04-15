// export const API_URL = "https://conduit.productionready.io/api";
let API_URL = "http://localhost:4000";
if (process.env.NODE_ENV === "production") {
  API_URL = "http://192.168.2.72:4000";
}
export { API_URL };

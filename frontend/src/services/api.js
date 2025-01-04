import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const addCollege = (collegeData) => API.post("/api/college", collegeData);

export default API;

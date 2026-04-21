import axios from "axios";

const baseURL = "http://localhost:8080";

export const getJobs = () => {
  return axios.get(`${baseURL}/jobs`);
};

export const getSpecific = (jobId) => {
  return axios.get(`${baseURL}/jobs/${jobId}`);
};
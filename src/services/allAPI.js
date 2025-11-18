import axiosConfig from "./axiosConfig";
import { baseURL } from "./baseURL";

export const createJob = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/job`, reqBody);
};

export const getJob = async () => {
  return await axiosConfig(`get", "${baseURL}/job`, "");
};

export const deleteJob = async (id) => {
  return await axiosConfig("delete", `${baseURL}/job/${id}`, "");
};

export const updateJob = async (id, reqBody) => {
  return await axiosConfig("patch", `${baseURL}/job${id}`, reqBody);
};

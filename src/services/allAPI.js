import axiosConfig from "./axiosConfig";

export const createJob = async (reqBody) => {
  return await axiosConfig("post", "http://localhost:3000/job", reqBody);
};

export const getJob = async () => {
  return await axiosConfig("get", "http://localhost:3000/job", "");
};

export const deleteJob = async (id) => {
  return await axiosConfig("delete", `http://localhost:3000/job/${id}`, "");
};

export const updateJob = async (id, reqBody) => {
  return await axiosConfig("patch", `http://localhost:3000/job/${id}`, reqBody);
};

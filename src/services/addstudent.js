import api from "./api";

export const getAddstudent = () => api.get("/addstudent");
export const getAddstudentById = (id) => api.get(`/addstudent/${id}`);
export const createAddstudent = (addstudentData) =>
  api.post("/addstudent", addstudentData);
export const updateAddstudent = (id, addstudentData) =>
  api.put(`/addstudent/${id}`, addstudentData);
export const deleteAddstudent = (id) => api.delete(`/addstudent/${id}`);

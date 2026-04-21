import api from "./api";

export const getRegistration = () => api.get("/registration");
export const getRegistrationById = (id) => api.get(`/registration/${id}`);
export const createRegistration = (studentData) =>
  api.post("/registration", studentData);
export const updateRegistration = (id, studentData) =>
  api.put(`/registration/${id}`, studentData);
export const deleteRegistration = (id) => api.delete(`/registration/${id}`);

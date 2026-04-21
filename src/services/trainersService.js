import api from "./api";

// GET ALL
export const getTrainers = () => api.get("/trainers");

// GET BY ID
export const getTrainersById = (id) => api.get(`/trainers/${id}`);

// CREATE (Image Upload ✅)
export const createTrainers = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("specialization", data.specialization);
  formData.append("experience", data.experience);
  formData.append("image", data.image); // 👈 file

  return api.post("/trainers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// UPDATE (Image Optional ✅)
export const updateTrainers = (id, data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("specialization", data.specialization);
  formData.append("experience", data.experience);

  // 👇 only if new image selected
  if (data.image) {
    formData.append("image", data.image);
  }

  return api.put(`/trainers/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteTrainers = (id) => api.delete(`/trainers/${id}`);

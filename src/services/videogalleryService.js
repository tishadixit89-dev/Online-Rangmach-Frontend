import api from "./api";

// Get all
export const getVideogallery = () => api.get("/videogallery");

// Get by ID
export const getVideogalleryById = (id) => api.get(`/videogallery/${id}`);

// Create (Video Upload ✅)
export const createVideogallery = (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("video", data.video); // 👈 file

  return api.post("/videogallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update (Video Optional ✅)
export const updateVideogallery = (id, data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);

  // 👇 only if new video selected
  if (data.video) {
    formData.append("video", data.video);
  }

  return api.put(`/videogallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete
export const deleteVideogallery = (id) => api.delete(`/videogallery/${id}`);

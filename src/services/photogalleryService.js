import api from "./api";

// Get all
export const getPhotogallery = () => api.get("/photogallery");

// Get by ID
export const getPhotogalleryById = (id) => api.get(`/photogallery/${id}`);

// Create (Image Upload ✅)
export const createPhotogallery = (photogalleryData) => {
  const formData = new FormData();

  formData.append("title", photogalleryData.title);
  formData.append("description", photogalleryData.description);
  formData.append("image", photogalleryData.image); // 👈 file

  return api.post("/photogallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update (Image Optional ✅)
export const updatePhotogallery = (id, photogalleryData) => {
  const formData = new FormData();

  formData.append("title", photogalleryData.title);
  formData.append("description", photogalleryData.description);

  // 👇 only if new image selected
  if (photogalleryData.image) {
    formData.append("image", photogalleryData.image);
  }

  return api.put(`/photogallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete
export const deletePhotogallery = (id) => api.delete(`/photogallery/${id}`);

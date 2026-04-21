import api from "./api";

// GET ALL
export const getCourses = () => api.get("/courses");

// GET BY ID
export const getCoursesById = (id) => api.get(`/courses/${id}`);

// CREATE (Image Upload ✅)
export const createCourses = (data) => {
  const formData = new FormData();

  formData.append("coursename", data.coursename);
  formData.append("duration", data.duration);
  formData.append("fees", data.fees);
  formData.append("description", data.description);
  formData.append("image", data.image); // 👈 file

  return api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// UPDATE (Image Optional ✅)
export const updateCourses = (id, data) => {
  const formData = new FormData();

  formData.append("coursename", data.coursename);
  formData.append("duration", data.duration);
  formData.append("fees", data.fees);
  formData.append("description", data.description);

  // 👇 only if new image selected
  if (data.image) {
    formData.append("image", data.image);
  }

  return api.put(`/courses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteCourses = (id) => api.delete(`/courses/${id}`);

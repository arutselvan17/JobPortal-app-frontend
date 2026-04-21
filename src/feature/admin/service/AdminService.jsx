import axiosInstance from "../../../service/AxiosInstance";

export const getAllUsers = () => {
  return axiosInstance.get("/admin/users");
};

export const getAllCompany = () => {
  return axiosInstance.get("/admin/company");
}

export const postCompany = (data) => {
  return axiosInstance.post("/admin/company", data);
};

export const getAllCategory = () => {
  return axiosInstance.get("/categories");
};

export const postCategory = (newCategory) => {
  return axiosInstance.post("/categories", newCategory);
};

export const deleteCategory = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};

export const editeCategory = (id, data) => {
  return axiosInstance.put(`/categories/${id}`, data);
};


export const updateUserStatus = (userId, status) => {
  return axiosInstance.patch(`admin/user/${userId}/${status}`);
};


export const getAllJob = () =>{
  return axiosInstance.get(`admin/jobs`)
}

export const getAllApplications = () => {
  return axiosInstance.get("/admin/applications");
};

export const getAllEmployerRequests = () => {
  return axiosInstance.get("/admin/request");
};

export const approveEmployer = (id) => {
  return axiosInstance.patch(`/admin/request/${employerId}`);
};
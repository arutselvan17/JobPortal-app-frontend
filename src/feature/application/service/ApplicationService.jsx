import axiosInstance from "../../../service/AxiosInstance"

export const getJobApplication = ()=>{
  return axiosInstance.get("applications/job-applications")
}

export const updateStatusOfApplication = (applicationId,status) =>{
  return axiosInstance.patch(`applications/${applicationId}/${status}`)
}
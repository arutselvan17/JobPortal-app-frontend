import axiosInstance from "../../../service/AxiosInstance"

export const getJobApplication = ()=>{
  return axiosInstance.get("applications/job-applications")
}

export const updateStatusOfApplication = (applicationId,status) =>{
  return axiosInstance.patch(`applications/${applicationId}/${status}`)
}

export const getMyApplications = () =>{
  return axiosInstance.get("applications/my")
}

export const applyforJob = (jobId) =>{
  return axiosInstance.post(`jobs/apply/${jobId}`)
}
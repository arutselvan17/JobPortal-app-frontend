import axiosInstance from "../../../service/AxiosInstance";

export const getmyJobs = () => {
  return axiosInstance.get("jobs/my");
};

export const updateJobStatusApi = (jobId, status) => {
  return axiosInstance.patch(
    `jobs/${jobId}/status`,
    { status } 
  );
};

export const extendDeadlineApi = (jobId, deadLine) => {
  return axiosInstance.patch(
    `jobs/${jobId}/extend-deadline`,
    { newDeadLine: deadLine } 
  );
};

export const postJob = (data) =>{
    const res= axiosInstance.post("/jobs",data)
    return res;
}

export const setSkillApi = (jobId, skills) => {
    // console.log(skills)
  return axiosInstance.put(`/jobs/${jobId}/set-skill`, skills);
};


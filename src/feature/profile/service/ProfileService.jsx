import axiosInstance from '../../../service/AxiosInstance'

export const getMyProfile = () => {
    return axiosInstance.get("profile/my")
}

export const updateMyProfile = (userData) => {
    return axiosInstance.put("profile/update-personal-info", userData)
}

// Skills
export const addSkills = (skills) => {
    return axiosInstance.post("profile/employee/skills", skills)
}

export const updateSkill = (skillId, skillDTO) => {
    return axiosInstance.put(`profile/employee/skills/${skillId}`, skillDTO)
}

export const deleteSkill = (skillId) => {
    return axiosInstance.delete(`profile/employee/skills/${skillId}`)
}

// Education
export const addEducations = (educations) => {
    return axiosInstance.post("profile/employee/education-info", educations)
}

export const updateEducation = (educationId, educationDTO) => {
    return axiosInstance.put(`profile/employee/education-info/${educationId}`, educationDTO)
}

export const deleteEducation = (educationId) => {
    return axiosInstance.delete(`profile/employee/education-info/${educationId}`)
}

// Company
export const addCompanyInfo = (companyDTO) => {
    return axiosInstance.post("profile/employer/company-info", companyDTO)
}

export const updateCompanyInfo = (companyDTO) => {
    return axiosInstance.put("profile/employer/company-info", companyDTO)
}
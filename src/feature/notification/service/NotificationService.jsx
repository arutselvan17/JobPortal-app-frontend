import axiosInstance from "../../../service/AxiosInstance"

export const getTodayUnreadNotifications = () =>{

    return axiosInstance.get(`/notification/today/unread`)
}

export const markAsRead = (id) =>{
    return axiosInstance.patch(`/notification/today/${id}/read`)
}
import axiosInstance from "../../../service/AxiosInstance";
import { jwtDecode } from "jwt-decode";


export const login = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  

  // console.log(res.data.body)

  // const decode = jwtDecode(res.data.body.accessToken)
  // console.log(decode)

  return res.data; 
};

export const register =  (data) => {
  const res =  axiosInstance.post("/auth/register",data)
  // console.log(res.data)
  return res
}
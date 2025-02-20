import axiosInstance from "../common/axios.instance";
import { getHeaderMultiPartFormData } from "../utils/service.util";

export const callGetMe = async () => {
  return await axiosInstance.get("/user/me");
};

export const callUpdateUser = async (form: FormData) => {
  const headers = getHeaderMultiPartFormData();
  return await axiosInstance.put("/user", form, { headers });
};

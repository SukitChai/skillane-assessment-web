import axiosInstance from "../common/axios.instance";
import {
  TEmail,
  TLogInBody,
  TResetPasswordBody,
  TSignUpBody,
} from "../types/login";

export const callLogIn = async (body: TLogInBody) => {
  return await axiosInstance.post("auth/login", body);
};

export const callLogInWithGoogle = async (credential: string) => {
  return await axiosInstance.post("auth/google", { credential });
};

export const callSignUp = async (body: TSignUpBody) => {
  return await axiosInstance.post("auth/signup", body);
};

export const callForgotPassword = async (body: TEmail) => {
  return await axiosInstance.post("auth/forgot-password", body);
};

export const callResetPassword = async (body: TResetPasswordBody) => {
  return await axiosInstance.post("auth/reset-password", body);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

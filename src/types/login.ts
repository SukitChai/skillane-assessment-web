import { CredentialResponse } from "@react-oauth/google";
import { Dispatch, SetStateAction } from "react";

export type TPassword = {
  password: string;
};

export type TConfirmPassword = {
  confirmPassword: string;
};

export type TEmail = {
  email: string;
};

export type TLogInBody = TPassword & TEmail;

export type TProfileInfo = {
  mobileNumber: string;
  identifyNumber: string;
  dob: Date;
};

export type TResetPassword = TPassword & TConfirmPassword;

export type TSignUpBody = TLogInBody & TConfirmPassword & TProfileInfo;

export type TResetPasswordBody = {
  token: string;
} & TPassword;

export type TUpdateUserBody = {
  file: any;
} & TProfileInfo;

export type TSetSection = {
  setSection: Dispatch<SetStateAction<string>>;
};

export type TOnFinish<Body, Return> = {
  onFinish: (body: Body) => Promise<Return>;
};

export type TLogInProps = {
  handleSuccess: (credentialResponse: CredentialResponse) => Promise<void>;
  handleError: () => void;
} & TSetSection &
  TOnFinish<TLogInBody, void>;

export type TSignUpProps = TSetSection & TOnFinish<TSignUpBody, void>;

export type TForgotPasswordProps = TSetSection & TOnFinish<TEmail, void>;

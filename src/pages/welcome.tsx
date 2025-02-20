import { CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { Col, message, Row } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/forgot-password";
import LogIn from "../components/login";
import SignUp from "../components/signup";
import {
  callForgotPassword,
  callLogIn,
  callLogInWithGoogle,
  callSignUp,
} from "../services/auth.service";
import { TEmail, TLogInBody, TSignUpBody } from "../types/login";

const Welcome = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState<string>("logIn");
  const callMutateLogIn = useMutation<
    AxiosResponse<{ accessToken: string; refreshToken: string }>,
    AxiosError<{ message: string }, any>,
    TLogInBody
  >({
    mutationKey: ["login"],
    mutationFn: (body: TLogInBody) => callLogIn(body),
  });
  const callMutateSignUp = useMutation<
    AxiosResponse<void>,
    AxiosError<{ message: string }, any>,
    TSignUpBody
  >({
    mutationKey: ["signup"],
    mutationFn: (body: TSignUpBody) => callSignUp(body),
  });
  const callMutateForgotPassword = useMutation<
    AxiosResponse<void>,
    AxiosError<{ message: string }, any>,
    TEmail
  >({
    mutationKey: ["forgot-password"],
    mutationFn: (body: TEmail) => callForgotPassword(body),
  });
  const callMutateLogInWithGoogle = useMutation<
    AxiosResponse<{ accessToken: string; refreshToken: string }>,
    AxiosError<{ message: string }, any>,
    string
  >({
    mutationKey: ["login-google"],
    mutationFn: (body: string) => callLogInWithGoogle(body),
  });

  const renderSection = (section: string) => {
    if (section === "signUp") {
      return <SignUp onFinish={onFinishSignUp} setSection={setSection} />;
    }

    if (section === "forgotPassword") {
      return (
        <ForgotPassword
          onFinish={onFinishForgotPassword}
          setSection={setSection}
        />
      );
    }

    return (
      <LogIn
        onFinish={onFinish}
        handleSuccess={handleSuccess}
        handleError={handleError}
        setSection={setSection}
      />
    );
  };

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    callMutateLogInWithGoogle.mutate(credential as string, {
      onSuccess: (data) => {
        message.success("Sign in success!!!");
        localStorage.setItem("accessToken", data.data.accessToken);
        navigate("/");
      },
      onError: (error) => {
        message.error(error.response?.data.message);
      },
    });
  };

  const onFinish = async (values: TLogInBody) => {
    callMutateLogIn.mutate(values, {
      onSuccess: (data) => {
        message.success("Sign in success!!!");
        localStorage.setItem("accessToken", data.data.accessToken);
        navigate("/");
      },
      onError: (error) => {
        message.error(error.response?.data.message);
      },
    });
  };

  const onFinishSignUp = async (values: TSignUpBody) => {
    const isNotEqualPassword = values.password !== values.confirmPassword;
    if (isNotEqualPassword) {
      message.error("Password and confirm password must be exactly the same");
      return;
    }

    callMutateSignUp.mutate(values, {
      onSuccess: () => {
        onFinish({ email: values.email, password: values.password });
      },
      onError: (error) => {
        message.error(error.response?.data.message);
      },
    });
  };

  const onFinishForgotPassword = async (values: TEmail) => {
    callMutateForgotPassword.mutate(values, {
      onSuccess: () => {
        message.success("Send url for reset password in your email");
        setSection("logIn");
      },
      onError: (error) => {
        message.error(error.response?.data.message);
      },
    });
  };

  const handleError = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col
          xs={0}
          sm={0}
          md={14}
          lg={14}
          xl={14}
          style={{ backgroundColor: "#1761d1" }}
        ></Col>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          xl={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          {renderSection(section)}
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;

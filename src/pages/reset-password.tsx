import { Button, Col, Form, Input, message, Row } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { TResetPassword, TResetPasswordBody } from "../types/login";
import { callResetPassword } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactElement } from "react";

const ResetPassword = (): ReactElement => {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParam.get("token");

  const callMutateResetPassword = useMutation<
    AxiosResponse<{ accessToken: string; refreshToken: string }>,
    AxiosError<{ message: string }, any>,
    TResetPasswordBody
  >({
    mutationKey: ["reset-password"],
    mutationFn: (body: TResetPasswordBody) => callResetPassword(body),
  });

  const onFinish = async (value: TResetPassword) => {
    const notHaveToken = !token;
    if (notHaveToken) {
      message.error("Not have token");
      return;
    }

    const inValidPassword = value.password !== value.confirmPassword;
    if (inValidPassword) {
      message.error("Password and Confirm password must be the same");
      return;
    }

    const body = {
      token,
      password: value.password,
    };

    callMutateResetPassword.mutate(body, {
      onSuccess: () => {
        message.success("Reset password success");
        navigate("/login");
      },
      onError: (error) => {
        message.error(error.response?.data.message);
      },
    });
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="home">
          <div style={{}}>
            <Form
              name="basic"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h1 style={{ marginBottom: "1rem" }}>Reset password</h1>
              </div>
              <Form.Item
                label="Password"
                labelAlign="left"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                labelAlign="left"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
